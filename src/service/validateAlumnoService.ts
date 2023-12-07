import { Alumno } from "../entity/Alumno";

export class AlumnoValidatorService {
    public isValid(alumno: Alumno): boolean {
      return (
        typeof alumno.id === 'number' &&
        typeof alumno.promedio === 'number' && alumno.promedio > 0 &&
        typeof alumno.nombres === 'string' && alumno.nombres.length > 0 &&
        typeof alumno.apellidos === 'string' && alumno.apellidos.length > 0 &&
        typeof alumno.matricula === 'string' && alumno.matricula.length > 0
      );
    }
  }