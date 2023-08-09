import Joi from "@hapi/joi";

//validation
export const patientSchema = Joi.object({
    patientName: Joi.string().required(),
    patientRg: Joi.string().max(10).required()
});