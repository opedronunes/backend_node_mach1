
class DoctorService 
{
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
}

export default DoctorService;