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
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const doctorRequest_1 = require("../doctor/doctorRequest");
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
class DoctorController {
    constructor(doctorService) {
        this.doctorService = doctorService;
    }
    createDoctor(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, crm, password } = request.body;
            const { error } = doctorRequest_1.doctorSchema.validate(request.body);
            if (error) {
                return response.status(400).json({
                    error: error.details[0].message
                });
            }
            ;
            try {
                const newDoctor = {
                    id: (0, uuid_1.v4)(),
                    name,
                    crm,
                    password
                };
                const insertdDoctor = yield this.doctorService.createDoctor(newDoctor);
                return response.status(201).json(insertdDoctor);
            }
            catch (error) {
                return response.status(404).send("Usuário já cadastrado!");
            }
        });
    }
}
exports.default = DoctorController;
