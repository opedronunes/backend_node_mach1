"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appointmentSchema = void 0;
const joi_1 = __importDefault(require("@hapi/joi"));
//validation
exports.appointmentSchema = joi_1.default.object({
    appointmentName: joi_1.default.string().required(),
    appointmentDescription: joi_1.default.string().min(5).required(),
    appointmentDate: joi_1.default.date().required(),
    patient_id: joi_1.default.required(),
    doctor_id: joi_1.default.required()
});
