
import {addChartValidation} from "../validations/chart.validation.js";
import {prismaClient} from "../application/database.js";
import {ResponseError} from "../error/response.error.js";
import {validate} from "../validations/validation.js";
import {v4 as uuid} from "uuid";


const addChart = async (request) => {
    const data = validate(addChartValidation, request);

    const merchandise = await prismaClient.merchandise.findUnique({
        where: { id: data.id_merchandise }
    });

    if (!merchandise) {
        throw new ResponseError(404, "Merchandise not found");
    }

    if (merchandise.stock - data.quantity < 0) {
        throw new ResponseError(400, "Out of stock");
    }

    await prismaClient.merchandise.update({
        where: { id: data.id_merchandise },
        data: {
            stock: merchandise.stock - data.quantity
        }
    });

    const chart = await prismaClient.chartOrder.create({
        data: {
            id: uuid().slice(0, 5),
            email_user: data.email_user,
            id_merchandise: data.id_merchandise,
            quantity: data.quantity,
            packing_cost: data.packing_cost,
            shipping_cost: data.shipping_cost,
            total_cost: data.total_cost,
            status_payment: data.status_payment,
            status_order: ""
        }
    });

    return chart;
};

const getAllChartsByUser = async (email_user) => {
    const charts = await prismaClient.chartOrder.findMany({
        where: {
            email_user: email_user
        },
        include: {
            merchandise: true
        }
    });

    return charts;
};

const getAllCharts = async () => {
    const charts = await prismaClient.chartOrder.findMany({
        include: {
            merchandise: true
        }
    });

    return charts;
};

const deleteChart = async (id_chart) => {
    const chart = await prismaClient.chartOrder.findUnique({
        where: {
            id: id_chart,
        },
    });

    if (!chart) {
        throw new ResponseError(404, "Chart item not found");
    }

    await prismaClient.chartOrder.delete({
        where: {
            id: chart.id,
        },
    });

    const merchandise = await prismaClient.merchandise.findUnique({
        where: {
            id: chart.id_merchandise,
        },
    });

    if (!merchandise) {
        throw new ResponseError(404, "Merchandise not found");
    }

    await prismaClient.merchandise.update({
        where: {
            id: merchandise.id,
        },
        data: {
            stock: merchandise.stock + chart.quantity,
        },
    });

    return {
        message: "Chart item deleted successfully",
    };
};

const updateStatus = async (req) => {
    const order = await prismaClient.chartOrder.findUnique({
        where: {id: req.body.id}
    })
    console.log(req.body)
    if(!order) {
        throw new ResponseError(404, "Order not found")
    }

    return prismaClient.chartOrder.update({
        where: {
            id: req.body.id,
        },
        data: {
            status_payment: req.body.status_payment,
            status_order: req.body.status_order
        }
    })
}

// const getAllOrdersByUser = async (email_user) => {
//     const orders = await prismaClient.chartOrder.findMany({
//         where: {
//             email_user: email_user,
//             status_payment: "paid"
//         },
//         include: {
//             merchandise: true
//         }
//     });

//     return orders;
// };

const getAllOrdersByUser = async (email_user) => {
    return prismaClient.chartOrder.findMany({
        where: {
            email_user,
            status_payment: "paid"
        },
        include: {
            merchandise: true
        }
    });
};

export default {
    addChart, getAllChartsByUser, deleteChart, getAllCharts, updateStatus, getAllOrdersByUser
}
