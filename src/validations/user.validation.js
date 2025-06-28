import Joi from "joi";

const registerUserValidation = Joi.object({
    name: Joi.string().max(100).required(),
    email: Joi.string().max(100).required(),
    password: Joi.string().max(100).required(),
    address: Joi.string(),
});

const loginUserValidation = Joi.object({
    email: Joi.string().max(100).required(),
    password: Joi.string().max(100).required()
});

const getUserValidation = Joi.string().max(100).required();

const updateUserValidation = Joi.object({
    name: Joi.string().max(100).optional(),
    email: Joi.string().max(100).required(),
    password: Joi.string().max(100).allow("").optional(),
    address: Joi.string().optional()
})

export {
    registerUserValidation,
    loginUserValidation,
    getUserValidation,
    updateUserValidation
}
