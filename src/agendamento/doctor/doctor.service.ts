import database from "../db/database";

class DoctorService 
{
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

  async createDoctor(newDoctor: Doctor): Promise<Doctor | null>{
    const connection = database.getConnection();
    try {
      const sql = 'INSERT INTO doctors (name, crm, password) VALUES (?, ?, ?)';
      const values = [newDoctor.name, newDoctor.crm, newDoctor.password];
      const [result] = await connection.execute(sql, values);
      const insertId = (result as any).insertId;
      if (insertId) {
        newDoctor.id = insertId;
        return newDoctor;
      }
      return null;
    } catch (error) {
      console.error('Erro ao cadastrar: ', error);
      return null;
    }finally{
      database.closeConnection();
    }
  }

  async getDoctorByCrm(crm: string): Promise<Doctor | null> {
    const connection = database.getConnection();

    try {
      const sql = 'SELECT * FROM doctors WHERE crm = ?';
      const [results] = await connection.execute(sql, [crm]);

      if (Array.isArray(results) && results.length > 0) {
        const doctorData = results[0];
        const doctor: Doctor = {
          id: doctorData.id,
          name: doctorData.doctorName,
          crm: doctorData.doctorCrm,
          password: doctorData.doctorPass,
        };
        return doctor;
      }

      return null;
    } catch (error) {
      console.error('Error fetching doctor by CRM:', error);
      return null;
    } finally {
      database.closeConnection();
    }
  }

}

export default DoctorService;