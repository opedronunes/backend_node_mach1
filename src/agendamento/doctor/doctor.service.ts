
class DoctorService 
{
  
  createDoctor(newDoctor: Doctor, doctors: Doctor[]){
    const crm = doctors.find((uniqueCrm) => uniqueCrm.crm === newDoctor.crm);
    if (!crm) {
      doctors.push(newDoctor);
      return newDoctor;
    }
    return null;
  }
}

export default new DoctorService();