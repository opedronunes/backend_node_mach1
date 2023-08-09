import Joi from "@hapi/joi";

//validation
export const appointmentSchema = Joi.object({
    appointmentName: Joi.string().required(),
    appointmentDescription: Joi.string().min(5).required(),
    appointmentDate: Joi.date().required(),
    patient_id: Joi.required(),
    doctor_id: Joi.required()
});