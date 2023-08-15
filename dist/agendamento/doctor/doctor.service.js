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
const database_1 = __importDefault(require("../db/database"));
class DoctorService {
    /*
    private doctors: Doctor[] = [];
  
    async createDoctor(newDoctor: Doctor): Promise<Doctor | null>{
      const existingDoctor = this.doctors.find((crm) => crm.crm === newDoctor.crm)
      //const crm = doctors.find((uniqueCrm) => uniqueCrm.crm === newDoctor.crm);
      if (!existingDoctor) {
        this.doctors.push(newDoctor);
        return newDoctor;
      }
      return null;
    }
    */
    createDoctor(newDoctor) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = database_1.default.getConnection();
            try {
                const sql = 'INSERT INTO doctors (name, crm, password) VALUES (?, ?, ?)';
                const values = [newDoctor.name, newDoctor.crm, newDoctor.password];
                const [result] = yield connection.execute(sql, values);
                const insertId = result.insertId;
                if (insertId) {
                    newDoctor.id = insertId;
                    return newDoctor;
                }
                return null;
            }
            catch (error) {
                console.error('Erro ao cadastrar: ', error);
                return null;
            }
            finally {
                database_1.default.closeConnection();
            }
        });
    }
}
exports.default = DoctorService;
