import Joi from 'joi';

const orderValidateSchema = Joi.object({
    email: Joi.string().email().required(),
    productId: Joi.string().required(),
    price: Joi.number().positive().required(),
    quantity: Joi.number().integer().positive().required(),
});

export default orderValidateSchema;
