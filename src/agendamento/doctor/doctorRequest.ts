import Joi from "@hapi/joi";

//validation
export const doctorSchema = Joi.object({
    name: Joi.string().required(),
    crm: Joi.string().max(11).required(),
    password: Joi.string().required(),
});