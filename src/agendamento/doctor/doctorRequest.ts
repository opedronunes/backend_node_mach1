import Joi from "@hapi/joi";

//validation
export const doctorSchema = Joi.object({
    doctorName: Joi.string().required(),
    doctorCnh: Joi.string().max(11).required(),
    doctorPass: Joi.string().required(),
});