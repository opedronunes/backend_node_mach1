import bodyParser from "body-parser";
import express from "express";
import JWT from 'jsonwebtoken';
import { v4 as uuidv4 } from "uuid";
import { AuthGuard } from "../Auth/auth";
import { secretKey } from "../Auth/config";
import { doctorSchema } from "./doctorRequest";

const app = express();
const doctors: Doctor[] = [];


app.use(bodyParser.json());


//Doctor Login
app.post('/login', (request, response) => {
    const { doctorCnh, doctorPass } = request.body;
    
    const doctor = doctors.find((dct) => dct.doctorCnh === doctorCnh);

    if (doctorCnh === doctor?.doctorCnh && doctorPass === doctor?.doctorPass) {
        const token = JWT.sign({
           doctorCnh
        }, secretKey, {
            expiresIn: "15m",
        });

        response.json({token});
        return;
    }
    response.status(401).send("Usuário não encontrado!");
})


// All doctors
app.get('/doctors', AuthGuard , (request, response) => {
    
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
        doctorCnh,
        doctorPass
    } = request.body;

    const cnh = doctors.find((uniqueCnh) => uniqueCnh.doctorCnh === doctorCnh);

    //valida se cnh ja existe no banco
    if (!cnh) {
        const newDoctor: Doctor = {
            id: uuidv4(),
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
        doctorCnh,
        doctorPass
    } = request.body;

    const doctor = doctors.find((dct) => dct.id === id);

    if (!doctor) {
        return response.status(404).json({
            message: 'Médico não encontrado!'
        });
    };

    doctor.doctorName = doctorName;
    doctor.doctorCnh = doctorCnh;
    doctor.doctorPass = doctorPass;

    return response.json(doctor);

});

app.listen(8080, () => {
    console.log("SERVER RUNNING");
});
