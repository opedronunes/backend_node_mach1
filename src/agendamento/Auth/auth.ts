import JWT from 'jsonwebtoken';
import { secretKey } from './config';

const doctors: Doctor[] = [];

//Auth doctor
export function AuthGuard(request:any, response:any, next:any)
{
    const { headers } = request;
    const { authorization } = headers;
    const { crm } = request.params;
    try{
        const doctor = doctors.find((dct) => dct.crm === crm);
        const decoded:any = JWT.verify(authorization, secretKey);

        if (decoded.doctorCrm === doctor?.crm) {
        }
        
    }catch(error){
        response.status(401).send("Usuário não autorizado!");
    }
    next();
    
}