import { Profesor } from "../entity/Profesor";

export class ProfesorValidatorService {
    public isValid(profesor: Profesor): boolean {
        return (
          typeof profesor.horasClase === 'number' && profesor.horasClase > 0 &&
          typeof profesor.numeroEmpleado === 'number' && profesor.numeroEmpleado > 0 &&
          typeof profesor.nombres === 'string' && profesor.nombres.length > 0 &&
          typeof profesor.apellidos === 'string' && profesor.apellidos.length > 0
        );
      }
}