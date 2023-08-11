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
class DoctorService {
    constructor() {
        this.doctors = [];
    }
    createDoctor(newDoctor) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingDoctor = this.doctors.find((crm) => crm.crm === newDoctor.crm);
            //const crm = doctors.find((uniqueCrm) => uniqueCrm.crm === newDoctor.crm);
            if (!existingDoctor) {
                this.doctors.push(newDoctor);
                return newDoctor;
            }
            return null;
        });
    }
}
exports.default = DoctorService;
