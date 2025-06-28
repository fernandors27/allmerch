import Joi from "joi";

const addMerchandiseDetailValidation = Joi.object({
    id_merchandise: Joi.string().max(50).required(),
    details: Joi.array().items(
        Joi.string().min(1).required()
    ).min(1).required(),
});

export {
    addMerchandiseDetailValidation
}