"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthGuard = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("./config");
const doctors = [];
//Auth doctor
function AuthGuard(request, response, next) {
    const { headers } = request;
    const { authorization } = headers;
    const { crm } = request.params;
    try {
        const doctor = doctors.find((dct) => dct.crm === crm);
        const decoded = jsonwebtoken_1.default.verify(authorization, config_1.secretKey);
        if (decoded.doctorCrm === (doctor === null || doctor === void 0 ? void 0 : doctor.crm)) {
        }
    }
    catch (error) {
        response.status(401).send("Usuário não autorizado!");
    }
    next();
}
exports.AuthGuard = AuthGuard;
