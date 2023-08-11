"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const uuid_1 = require("uuid");
const doctor_service_1 = __importDefault(require("../doctor/doctor.service"));
const doctorRequest_1 = require("../doctor/doctorRequest");
const app = (0, express_1.default)();
const doctors = [];
app.use(body_parser_1.default.json());
function createDoctor(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const { error } = doctorRequest_1.doctorSchema.validate(request.body);
        if (error) {
            return response.status(400).json({
                error: error.details[0].message
            });
        }
        ;
        const { name, crm, password } = request.body;
        const newDoctor = {
            id: (0, uuid_1.v4)(),
            name,
            crm,
            password
        };
        const insertDoctor = doctor_service_1.default.createDoctor(newDoctor, doctors);
        if (insertDoctor) {
            return response.status(201).json(newDoctor);
        }
        else {
            return response.status(404).send("Usuário já cadastrado!");
        }
    });
}
exports.default = createDoctor;
