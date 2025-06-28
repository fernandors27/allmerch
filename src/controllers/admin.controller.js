import merchandiseService from "../services/merchandise.service.js";
import {prismaClient} from "../application/database.js";
import merchandiseDetailService from "../services/merchandise.detail.service.js";
import chartService from "../services/chart.service.js";

const dashboard = async (req, res, next) => {
    try {
        const merchandises = await merchandiseService.getAll();
        const categories = await prismaClient.category.findMany(); // ambil kategori

        res.render("admin/dashboard", {
            merchandises: merchandises.length > 0 ? merchandises : undefined,
            categories
        });
    } catch (e) {
        next(e);
    }
};

const merchandise = async (req, res, next) => {
    res.render("admin/merchandise", {})
}

const addMerchandise = async (req, res) => {
    try {
        const merchandise = await merchandiseService.add(req.body, req.file);
        res.redirect("/admin/dashboard");
    } catch (error) {
        res.status(400).send("Gagal menambahkan merchandise: " + error.message);
    }
};

const updateMerchandise = async (req, res, next) => {
    try {
        const merchandise = await merchandiseService.update(req.body, req.file);
        res.redirect("/admin/dashboard");
    } catch (e) {
        next(e);
    }
}

const deleteMerchandise = async (req, res, next) => {
    try {
        const merchandise = await merchandiseService.deleteByID(req.body.id);
        res.redirect("/admin/dashboard");
    } catch (e) {
        next(e);
    }
}

const addMerchandiseDetail = async (req, res, next) => {
    try {
        // console.log("BODY", req.body);
        const details = req.body;
        const createdDetails = await merchandiseDetailService.addMerchandiseDetail(details);
        res.redirect("/admin/dashboard")
    } catch (error) {
        next(error);
    }
};

const getOrder = async (req, res, next) => {
    try {
        let rawCharts = await chartService.getAllCharts();

        const charts = rawCharts.map((chart) => ({
            ...chart,
            is_pending: chart.status_payment === "pending",
            is_paid: chart.status_payment === "paid",
            is_failed: chart.status_payment === "failed",
            is_order_processing: chart.status_order === "processing",
            is_order_shipped: chart.status_order === "shipped",
            is_order_delivered: chart.status_order === "delivered",
            is_order_cancelled: chart.status_order === "cancelled",
        }));

        res.render('admin/order', {
            charts: charts.length > 0 ? charts : undefined
        });
    } catch (e) {
        next(e);
    }
}

const updateStatus = async (req, res, next) => {
    try {
        await chartService.updateStatus(req)
        res.redirect("/admin/orders");
    } catch (e) {
        next(e)
    }
}

export {
    dashboard, merchandise, addMerchandise, updateMerchandise, deleteMerchandise,
    addMerchandiseDetail, getOrder, updateStatus
}