"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const uuid_1 = require("uuid");
const auth_1 = require("../Auth/auth");
const patientRequest_1 = require("./patientRequest");
const app = (0, express_1.default)();
const patients = [];
app.use(body_parser_1.default.json());
// All patients
app.get('/patients', auth_1.AuthGuard, (request, response) => {
    const AllPatients = patients;
    if (AllPatients.length === 0) {
        return response.status(404).send("Nenhum médico encontrado!");
    }
    return response.status(200).json(AllPatients);
});
// insert doctor
app.post('/patients', auth_1.AuthGuard, (request, response) => {
    const { error } = patientRequest_1.patientSchema.validate(request.body);
    if (error) {
        return response.status(400).json({
            error: error.details[0].message
        });
    }
    ;
    const { patientName, patientRg, } = request.body;
    const rg = patients.find((uniqueRg) => uniqueRg.patientRg === patientRg);
    //valida se cnh ja existe no banco
    if (!rg) {
        const newPatient = {
            id: (0, uuid_1.v4)(),
            patientName,
            patientRg,
        };
        patients.push(newPatient);
        return response.status(201).json(newPatient);
    }
    return response.status(404).send("Paciente já cadastrado!");
});
// Update doctor
app.put('/patients/:id', auth_1.AuthGuard, (request, response) => {
    const { id } = request.params;
    const { error } = patientRequest_1.patientSchema.validate(request.body);
    if (error) {
        return response.status(400).json({
            error: error.details[0].message
        });
    }
    ;
    const { patientName, patientRg, } = request.body;
    const patient = patients.find((p) => p.id === id);
    if (!patient) {
        return response.status(404).json({
            message: 'Médico não encontrado!'
        });
    }
    ;
    patient.patientName = patientName;
    patient.patientRg = patientRg;
    return response.json(patient);
});
app.listen(8080, () => {
    console.log("SERVER RUNNING");
});
