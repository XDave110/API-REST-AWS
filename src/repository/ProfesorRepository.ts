import { Profesor } from "../entity/Profesor";

export class ProfesorRepository {
  private profesores: Profesor[];

  constructor() {
    this.profesores = [];
  }

  getAllProfesores(): Profesor[] {
    return this.profesores;
  }

  getProfesorById(id: number): Profesor | undefined {
    return this.profesores.find((profesor) => profesor.id === id);
  }

  addProfesor(profesor: Profesor): void {
    this.profesores.push(profesor);
  }

  updateProfesor(updatedProfesor: Profesor): boolean {
    const index = this.profesores.findIndex((profesor) => profesor.id === updatedProfesor.id);
    if (index !== -1) {
      this.profesores[index] = updatedProfesor;
      return true;
    }
    return false;
  }

  deleteProfesor(id: number): boolean {
    const initialLength = this.profesores.length;
    this.profesores = this.profesores.filter((profesor) => profesor.id !== id);
    return this.profesores.length !== initialLength;
  }
}
