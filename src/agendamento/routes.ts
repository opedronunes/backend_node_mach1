import bodyParser from "body-parser";
import express from "express";
import JWT from 'jsonwebtoken';
import { v4 as uuidv4 } from "uuid";
import { AuthGuard } from "./Auth/auth";
import { secretKey } from "./Auth/config";
import { doctorSchema } from "./doctor/doctorRequest";
import { patientSchema } from "./patient/patientRequest";
import { appointmentSchema } from "./appointment/appointmentRequest";

const app = express();
const doctors: Doctor[] = [];


app.use(bodyParser.json());


//Doctor Login
app.post('/login', (request, response) => {
    const { doctorCrm, doctorPass } = request.body;

    const doctor = doctors.find((dct) => dct.doctorCrm === doctorCrm);

    if (doctorCrm === doctor?.doctorCrm && doctorPass === doctor?.doctorPass) {
        const token = JWT.sign({
            doctorCrm
        }, secretKey, {
            expiresIn: "15m",
        });

        response.json({ token });
        return;
    }
    response.status(401).send("Usuário não encontrado!");
})

/* ROUTES DOCTOR */
// All doctors
app.get('/doctors', AuthGuard, (request, response) => {

    const AllDoctors = doctors;

    if (AllDoctors.length === 0) {
        return response.status(404).send("Nenhum médico encontrado!");
    }

    return response.status(200).json(AllDoctors);

});

// insert doctor
app.post('/doctors', (request, response) => {

    const { error } = doctorSchema.validate(request.body);

    if (error) {
        return response.status(400).json({
            error: error.details[0].message
        });
    };

    const {
        doctorName,
        doctorCrm,
        doctorPass
    } = request.body;

    const crm = doctors.find((uniqueCrm) => uniqueCrm.doctorCrm === doctorCrm);

    //valida se crm ja existe no banco
    if (!crm) {
        const newDoctor: Doctor = {
            id: uuidv4(),
            doctorName,
            doctorCrm,
            doctorPass
        };

        doctors.push(newDoctor);

        return response.status(201).json(newDoctor);
    }

    return response.status(404).send("Usuário já cadastrado!");

});

// Update doctor
app.put('/doctors/:id', AuthGuard, (request, response) => {

    const { id } = request.params;

    const { error } = doctorSchema.validate(request.body);

    if (error) {
        return response.status(400).json({
            error: error.details[0].message
        });
    };

    const {
        doctorName,
        doctorCrm,
        doctorPass
    } = request.body;

    const doctor = doctors.find((dct) => dct.id === id);

    if (!doctor) {
        return response.status(404).json({
            message: 'Médico não encontrado!'
        });
    };

    doctor.doctorName = doctorName;
    doctor.doctorCrm = doctorCrm;
    doctor.doctorPass = doctorPass;

    return response.json(doctor);

});

/* ROUTES PATIENT */
const patients: Patient[] = [];

// All patients
app.get('/patients', AuthGuard, (request, response) => {

    const AllPatients = patients;

    if (AllPatients.length === 0) {
        return response.status(404).send("Nenhum paciente encontrado!");
    }

    return response.status(200).json(AllPatients);

});

// insert patient
app.post('/patients', AuthGuard, (request, response) => {

    const { error } = patientSchema.validate(request.body);

    if (error) {
        return response.status(400).json({
            error: error.details[0].message
        });
    };

    const {
        patientName,
        patientRg,
    } = request.body;

    const rg = patients.find((uniqueRg) => uniqueRg.patientRg === patientRg);

    //valida se RG ja existe no banco
    if (!rg) {
        const newPatient: Patient = {
            id: uuidv4(),
            patientName,
            patientRg,
        };

        patients.push(newPatient);

        return response.status(201).json(newPatient);
    }

    return response.status(404).send("Paciente já cadastrado!");

});

// Update patient
app.put('/patients/:id', AuthGuard, (request, response) => {

    const { id } = request.params;

    const { error } = patientSchema.validate(request.body);

    if (error) {
        return response.status(400).json({
            error: error.details[0].message
        });
    };

    const {
        patientName,
        patientRg,
    } = request.body;

    const patient = patients.find((p) => p.id === id);

    if (!patient) {
        return response.status(404).json({
            message: 'Paciente não encontrado!'
        });
    };

    patient.patientName = patientName;
    patient.patientRg = patientRg;

    return response.json(patient);

});

/* ROUTES APPOINTMENT */
const appointments: Appointment[] = [];

//All Appointments
app.get('/appointments', AuthGuard, (request, response) => {
    const allAppointments = appointments;
    if (allAppointments.length === 0) {
        return response.status(404).send("Nenhuma consulta encontrado!");
    }

    return response.status(200).json(allAppointments);
});

// Insert appointment
app.post('/appointments', AuthGuard, (request, response) => {

    const { error } = appointmentSchema.validate(request.body);

    if (error) {
        return response.status(400).json({
            error: error.details[0].message
        });
    };

    const {
        appointmentName,
        appointmentDescription,
        appointmentDate,
        patient_id,
        doctor_id
    } = request.body;

    //busca por consultas existentes
    const proposedDate = new Date(appointmentDate);
    const existingAppointments = appointments.filter(
        appointment =>
            appointment.doctor_id === doctor_id &&
            Math.abs(proposedDate.getTime() - new Date(appointment.appointmentDate).getTime()) < 15 * 60 * 1000
    );

    if (existingAppointments.length > 0) {
        return response.status(409).json({
            error: 'Médico já possui consulta agendada no mesmo intervalo de tempo',
        });
    }

    const newAppointment: Appointment = {
        id: uuidv4(),
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
