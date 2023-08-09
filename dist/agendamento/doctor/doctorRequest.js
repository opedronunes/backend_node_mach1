"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.doctorSchema = void 0;
const joi_1 = __importDefault(require("@hapi/joi"));
//validation
exports.doctorSchema = joi_1.default.object({
    doctorName: joi_1.default.string().required(),
    doctorCnh: joi_1.default.string().max(11).required(),
    doctorPass: joi_1.default.string().required(),
});
