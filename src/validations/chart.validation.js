import Joi from "joi";

const addChartValidation = Joi.object({
    email_user: Joi.string().email().max(100).required(),
    id_merchandise: Joi.string().max(50).required(),
    quantity: Joi.number().integer().min(1).required(),
    packing_cost: Joi.number().integer().min(0).required(),
    shipping_cost: Joi.number().integer().min(0).required(),
    total_cost: Joi.number().integer().min(0).required(),
    status_payment: Joi.string().max(50).required()
});

export  { addChartValidation };
