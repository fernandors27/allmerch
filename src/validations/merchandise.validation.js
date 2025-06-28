import Joi from "joi";

const addMerchandiseValidation = Joi.object({
    name: Joi.string().max(100).required(),
    id_category: Joi.number().integer().required(),
    stock: Joi.number().integer().min(0).required(),
    price: Joi.number().integer().min(0).required(),
});

const updateMerchandiseValidation = Joi.object({
    id: Joi.string().required(),
    name: Joi.string().max(100).required(),
    id_category: Joi.number().integer().required(),
    stock: Joi.number().integer().min(0).required(),
    price: Joi.number().integer().min(0).required(),
});

export {
    addMerchandiseValidation,
    updateMerchandiseValidation
};
