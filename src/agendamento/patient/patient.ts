import bodyParser from "body-parser";
import express from "express";
import { v4 as uuidv4 } from "uuid";
import { AuthGuard } from "../Auth/auth";
import { patientSchema } from "./patientRequest";

const app = express();

const patients: Patient[] = [];


app.use(bodyParser.json());


// All patients
app.get('/patients', AuthGuard , (request, response) => {
    
    const AllPatients = patients;

    if (AllPatients.length === 0) {
        return response.status(404).send("Nenhum médico encontrado!");
    }

    return response.status(200).json(AllPatients);

});

// insert doctor
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

    //valida se cnh ja existe no banco
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

// Update doctor
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
            message: 'Médico não encontrado!'
        });
    };

    patient.patientName = patientName;
    patient.patientRg = patientRg;

    return response.json(patient);

});

app.listen(8080, () => {
    console.log("SERVER RUNNING");
});
