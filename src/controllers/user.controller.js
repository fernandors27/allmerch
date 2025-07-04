import userService from "../services/user.service.js";
import {prismaClient} from "../application/database.js";
import merchandiseService from "../services/merchandise.service.js";
import chartService from "../services/chart.service.js";
import dayjs from "dayjs";

const dashboard = async (req, res, next) => {
    try {
        const categories = await prismaClient.category.findMany({
            include: {merchandises: true}
        });

        res.render('index', {
            user: res.locals.user,
            categories: categories.length > 0 ? categories : undefined,
        });
    } catch (e) {
        next(e);
    }
}

const getLogin = async (req, res, next) => {
    res.render('user/login');
}

const postLogin = async (req, res, next) => {
    try {
        const result = await userService.login(req.body, res); // result berisi user data termasuk role

        if (result.role === "admin") {
            res.locals.user = result;
            return res.redirect("/admin/dashboard");
        } else {
            return res.redirect("/dashboard");
        }
    } catch (e) {
        res.render('user/login', {
            error: e.message,
            email: req.body.email // agar tidak kosong setelah error
        });
    }
};

const getRegister = async (req, res, next) => {
    res.render('user/register');
}

const postRegister = async (req, res, next) => {
    try {
        const result = await userService.register(req.body);
        res.status(200).render('user/login')
    } catch (e) {
        // next(e);
        res.render('user/register', {error: e.message});
    }
}

const profile = async (req, res) => {
    const user = await userService.profile(res.locals.user.email);
    res.status(200).render('user/profile', {user: res.locals.user});
}

const updateProfile = async (req, res, next) => {
    try {
        res.locals.user = await userService.updateProfile(req.body);
        res.render("user/profile", {success: "Update profile successfully"});
    } catch (e) {
        next(e);
    }
}

const orders = async (req, res, next) => {
    try {
        const rawOrders = await chartService.getAllOrdersByUser(res.locals.user.email);

        const orders = rawOrders.map(order => ({
            ...order,
            createdAtFormatted: dayjs(order.createdAt).format("DD MMMM YYYY, HH:mm")
        }));

        res.render('user/orders', { orders });
    } catch (e) {
        next(e);
    }
};

const charts = async (req, res, next) => {
    try {
        const rawCharts = await chartService.getAllChartsByUser(res.locals.user.email);

        // ✅ Filter hanya yang belum dibayar
        const unpaidCharts = rawCharts.filter(chart => chart.status_payment !== "failed");

        const charts = unpaidCharts.map((chart) => ({
            ...chart,
            is_pending: chart.status_payment === "pending",
            is_paid: chart.status_payment === "paid",
            is_failed: chart.status_payment === "failed",
            is_order_processing: chart.status_order === "processing",
            is_order_shipped: chart.status_order === "shipped",
            is_order_delivered: chart.status_order === "delivered",
            is_order_cancelled: chart.status_order === "cancelled",

            subtotal_item: chart.merchandise.price * chart.quantity
        }));

        const packingCost = 5000;
        const shippingCost = 25000;
        const subtotal = charts.reduce((total, item) => {
            return total + item.merchandise.price * item.quantity;
        }, 0);
        const totalCost = subtotal + packingCost + shippingCost;

        res.render("user/charts", {
            user: res.locals.user,
            charts,
            hasCharts: charts.length > 0,
            packing_cost: packingCost,
            shipping_cost: shippingCost,
            total_cost: totalCost,
            subtotal: subtotal,
        });
    } catch (e) {
        next(e);
    }
};


const logout = async (req, res) => {
    const token = req.cookies?.session_token;

    if (token) {
        await prismaClient.session.deleteMany({
            where: { token },
        });

        res.clearCookie("session_token");
    }
    res.locals.user = null;
    return res.redirect("/");
};

const merchandiseDetail = async (req, res, next) => {
    try {
        const merchandise = await merchandiseService.getByID(req.params.id);
        res.render('merchandise_detail', { merchandise });
    } catch (error) {
        next(error);
    }
};

const addChart = async (req, res, next) => {
    try {
        const quantity = parseInt(req.body.quantity);
        const price = parseInt(req.params.price); // Pastikan ini number juga

        const chart = {
            email_user: res.locals.user.email,
            id_merchandise: req.params.id,
            quantity: quantity,
            packing_cost: 5000,
            shipping_cost: 25000,
            total_cost: (price * quantity) + 5000 + 25000, // ✅ dihitung total semuanya
            status_payment: "Pending"
        }

        const result = await chartService.addChart(chart);
        res.redirect("/charts");
    } catch (error) {
        const merchandise = await merchandiseService.getByID(req.params.id);
        res.render('merchandise_detail', { merchandise, error: error.message });
    }
};

const deleteChart = async (req, res, next) => {
    try {
        await chartService.deleteChart(req.body.id);

        res.redirect("/charts");
    } catch (error) {
        next(error);
    }
};

const checkoutAll = async (req, res, next) => {
    try {
        const email = res.locals.user.email;

        const charts = await chartService.getAllChartsByUser(email);
        if (charts.length === 0) {
            return res.redirect("/charts");
        }

        // 1. Ubah semua chart ke paid + processing
        await Promise.all(
            charts.map(chart =>
                chartService.updateStatus({
                    body: {
                        id: chart.id,
                        status_payment: "paid",
                        status_order: "processing"
                    }
                })
            )
        );

        // ✅ Jangan hapus data chart-nya
        // chart akan tetap ada dan muncul di /orders karena status_payment = paid

        res.redirect("/orders");
    } catch (e) {
        next(e);
    }
};


export default {
    dashboard, getLogin, postLogin, getRegister, postRegister, profile,
    updateProfile, orders, charts, logout, merchandiseDetail, addChart,
    deleteChart, checkoutAll
}