"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const uuid_1 = require("uuid");
const auth_1 = require("./Auth/auth");
const config_1 = require("./Auth/config");
const doctorRequest_1 = require("./doctor/doctorRequest");
const patientRequest_1 = require("./patient/patientRequest");
const appointmentRequest_1 = require("./appointment/appointmentRequest");
const doctor_service_1 = __importDefault(require("./doctor/doctor.service"));
const app = (0, express_1.default)();
const doctors = [];
app.use(body_parser_1.default.json());
//Doctor Login
app.post('/login', (request, response) => {
    const { crm, password } = request.body;
    const doctor = doctors.find((dct) => dct.crm === crm);
    if (crm === (doctor === null || doctor === void 0 ? void 0 : doctor.crm) && password === (doctor === null || doctor === void 0 ? void 0 : doctor.password)) {
        const token = jsonwebtoken_1.default.sign({
            crm
        }, config_1.secretKey, {
            expiresIn: "15m",
        });
        response.json({ token });
        return;
    }
    response.status(401).send("Usuário não encontrado!");
});
/* ROUTES DOCTOR */
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
    const { name, crm, password } = request.body;
    //const crm = doctors.find((uniqueCrm) => uniqueCrm.doctorCrm === doctorCrm);
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
    const { name, crm, password } = request.body;
    const doctor = doctors.find((dct) => dct.id === id);
    if (!doctor) {
        return response.status(404).json({
            message: 'Médico não encontrado!'
        });
    }
    ;
    doctor.name = name;
    doctor.crm = crm;
    doctor.password = password;
    return response.json(doctor);
});
/* ROUTES PATIENT */
const patients = [];
// All patients
app.get('/patients', auth_1.AuthGuard, (request, response) => {
    const AllPatients = patients;
    if (AllPatients.length === 0) {
        return response.status(404).send("Nenhum paciente encontrado!");
    }
    return response.status(200).json(AllPatients);
});
// insert patient
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
    //valida se RG ja existe no banco
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
// Update patient
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
            message: 'Paciente não encontrado!'
        });
    }
    ;
    patient.patientName = patientName;
    patient.patientRg = patientRg;
    return response.json(patient);
});
/* ROUTES APPOINTMENT */
const appointments = [];
//All Appointments
app.get('/appointments', auth_1.AuthGuard, (request, response) => {
    const allAppointments = appointments;
    if (allAppointments.length === 0) {
        return response.status(404).send("Nenhuma consulta encontrado!");
    }
    return response.status(200).json(allAppointments);
});
// Insert appointment
app.post('/appointments', auth_1.AuthGuard, (request, response) => {
    const { error } = appointmentRequest_1.appointmentSchema.validate(request.body);
    if (error) {
        return response.status(400).json({
            error: error.details[0].message
        });
    }
    ;
    const { appointmentName, appointmentDescription, appointmentDate, patient_id, doctor_id } = request.body;
    //busca por consultas existentes
    const proposedDate = new Date(appointmentDate);
    const existingAppointments = appointments.filter(appointment => appointment.doctor_id === doctor_id &&
        Math.abs(proposedDate.getTime() - new Date(appointment.appointmentDate).getTime()) < 15 * 60 * 1000);
    if (existingAppointments.length > 0) {
        return response.status(409).json({
            error: 'Médico já possui consulta agendada no mesmo intervalo de tempo',
        });
    }
    const newAppointment = {
        id: (0, uuid_1.v4)(),
        appointmentName,
        appointmentDescription,
        appointmentDate,
        patient_id,
        doctor_id
    };
    appointments.push(newAppointment);
    return response.status(201).json(newAppointment);
});
app.listen(8080, () => {
    console.log("SERVER RUNNING");
});
