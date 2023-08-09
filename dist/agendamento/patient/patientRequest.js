"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.patientSchema = void 0;
const joi_1 = __importDefault(require("@hapi/joi"));
//validation
exports.patientSchema = joi_1.default.object({
    patientName: joi_1.default.string().required(),
    patientRg: joi_1.default.string().max(10).required()
});
