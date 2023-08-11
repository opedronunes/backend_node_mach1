import { v4 as uuidv4 } from "uuid";
import { doctorSchema } from "../doctor/doctorRequest";

import { Request, Response } from "express";
import DoctorService from "../doctor/doctor.service";


/*
const app = express();

const doctors: Doctor[] = [];

app.use(bodyParser.json());
async function createDoctor(request:any, response:any){
    
    const { error } = doctorSchema.validate(request.body);

    if (error) {
        return response.status(400).json({
            error: error.details[0].message
        });
    };
    const {
        name,
        crm,
        password
    } = request.body;

    const newDoctor: Doctor = {
        id: uuidv4(),
        name,
        crm,
        password
    };

    const insertDoctor = doctorService.createDoctor(newDoctor, doctors);

    if (insertDoctor) {
        return response.status(201).json(newDoctor);        
    }else{
        return response.status(404).send("Usuário já cadastrado!");
    }
}

export default createDoctor;
*/

class DoctorController 
{
    private doctorService: DoctorService;

    constructor(doctorService: DoctorService){
        this.doctorService = doctorService;
    }

    async createDoctor(request: Request, response: Response){

        const {name, crm, password} = request.body;

        const { error } = doctorSchema.validate(request.body);

        if (error) {
            return response.status(400).json({
                error: error.details[0].message
            });
        };
    
        try {
            const newDoctor: Doctor = {
                id: uuidv4(),
                name,
                crm,
                password
            };
            const insertdDoctor = await this.doctorService.createDoctor(newDoctor);
            return response.status(201).json(insertdDoctor);
        } catch (error) {
            return response.status(404).send("Usuário já cadastrado!");
        }
    }
}

export default DoctorController;