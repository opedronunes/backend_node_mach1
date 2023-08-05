import Joi from '@hapi/joi';

//validação de dados
export const productSchema = Joi.object({
    productName: Joi.string().required(),
    productDescription: Joi.string().required(),
    productCategory: Joi.string().required(),
    productCost: Joi.number().required(),
    productTags: Joi.array().items(Joi.string()),
    productRelated: Joi.array().items(Joi.number()),
});