"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const uuid_1 = require("uuid");
const auth_1 = require("../Auth/auth");
const config_1 = require("../Auth/config");
const doctorRequest_1 = require("./doctorRequest");
const app = (0, express_1.default)();
const doctors = [];
app.use(body_parser_1.default.json());
//Doctor Login
app.post('/login', (request, response) => {
    const { doctorCnh, doctorPass } = request.body;
    const doctor = doctors.find((dct) => dct.doctorCnh === doctorCnh);
    if (doctorCnh === (doctor === null || doctor === void 0 ? void 0 : doctor.doctorCnh) && doctorPass === (doctor === null || doctor === void 0 ? void 0 : doctor.doctorPass)) {
        const token = jsonwebtoken_1.default.sign({
            doctorCnh
        }, config_1.secretKey, {
            expiresIn: "15m",
        });
        response.json({ token });
        return;
    }
    response.status(401).send("Usuário não encontrado!");
});
// All doctors
app.get('/doctors', auth_1.AuthGuard, (request, response) => {
    const AllDoctors = doctors;
    if (AllDoctors.length === 0) {
        return response.status(404).send("Nenhum médico encontrado!");
    }
    return response.status(200).json(AllDoctors);
});
// insert doctor
app.post('/doctors', (request, response) => {
    const { error } = doctorRequest_1.doctorSchema.validate(request.body);
    if (error) {
        return response.status(400).json({
            error: error.details[0].message
        });
    }
    ;
    const { doctorName, doctorCnh, doctorPass } = request.body;
    const cnh = doctors.find((uniqueCnh) => uniqueCnh.doctorCnh === doctorCnh);
    //valida se cnh ja existe no banco
    if (!cnh) {
        const newDoctor = {
            id: (0, uuid_1.v4)(),
            doctorName,
            doctorCnh,
            doctorPass
        };
        doctors.push(newDoctor);
        return response.status(201).json(newDoctor);
    }
    return response.status(404).send("Usuário já cadastrado!");
});
// Update doctor
app.put('/doctors/:id', auth_1.AuthGuard, (request, response) => {
    const { id } = request.params;
    const { error } = doctorRequest_1.doctorSchema.validate(request.body);
    if (error) {
        return response.status(400).json({
            error: error.details[0].message
        });
    }
    ;
    const { doctorName, doctorCnh, doctorPass } = request.body;
    const doctor = doctors.find((dct) => dct.id === id);
    if (!doctor) {
        return response.status(404).json({
            message: 'Médico não encontrado!'
        });
    }
    ;
    doctor.doctorName = doctorName;
    doctor.doctorCnh = doctorCnh;
    doctor.doctorPass = doctorPass;
    return response.json(doctor);
});
app.listen(8080, () => {
    console.log("SERVER RUNNING");
});
