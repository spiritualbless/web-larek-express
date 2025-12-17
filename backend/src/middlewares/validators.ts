import { celebrate, Joi, Segments } from "celebrate";

export const productValidation = celebrate({
    [Segments.BODY]: Joi.object({
        title: Joi.string().min(2).max(30).required(),
        image: Joi.object({
            fileName: Joi.string().required(),
            originalName: Joi.string().required(),
        }).required(),
        category: Joi.string().required(),
        description: Joi.string(),
        price: Joi.number().min(0).allow(null),
    }),
});

export const orderValidator = celebrate({
    [Segments.BODY]: Joi.object({
    items: Joi.array().items(Joi.string()).min(1).required(),
    total: Joi.number().required(),
    payment: Joi.string().valid("card", "online").required(),
    email: Joi.string().email().required(),
    phone: Joi.string()
    .regex(/^((8|\+7)[- ]?)?(\(?\d{3}\)?[- ]?)?[\d\- ]{7,10}$/)
    .required(),
    address: Joi.string().required(),
    }),
});