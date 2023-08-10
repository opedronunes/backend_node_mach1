"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DoctorService {
    createDoctor(newDoctor, doctors) {
        const crm = doctors.find((uniqueCrm) => uniqueCrm.crm === newDoctor.crm);
        if (!crm) {
            doctors.push(newDoctor);
            return newDoctor;
        }
        return null;
    }
}
exports.default = new DoctorService();
