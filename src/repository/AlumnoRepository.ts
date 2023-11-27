import { Alumno } from "../entity/Alumno";

export class AlumnoRepository {
    private alumnos: Alumno[];
   constructor(){
    this.alumnos = []
   }
    getAllAlumnos(): Alumno[] {
      return this.alumnos;
    }
  
    getAlumnoById(id: number): Alumno | undefined {
      return this.alumnos.find((alumno) => alumno.id === id);
    }
  
    addAlumno(alumno: Alumno): void {
      this.alumnos.push(alumno);
    }
  
    updateAlumno(updatedAlumno: Alumno): boolean {
      const index = this.alumnos.findIndex((alumno) => alumno.id === updatedAlumno.id);
      if (index !== -1) {
        this.alumnos[index] = updatedAlumno;
        return true;
      }
      return false;
    }
  
    deleteAlumno(id: number): boolean {
      const initialLength = this.alumnos.length;
      this.alumnos = this.alumnos.filter((alumno) => alumno.id !== id);
      return this.alumnos.length !== initialLength;
    }
  }