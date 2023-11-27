import { Request, Response } from 'express';
import { Profesor } from "../entity/Profesor";
import { ProfesorRepository } from "../repository/ProfesorRepository";

export class ProfesorController {
  constructor(private readonly profesorRepository: ProfesorRepository){
  }
  
  public getAllProfesores(req: Request, res: Response){
    const profesores = this.profesorRepository.getAllProfesores();
    res.status(200).send(profesores); 
  }

  public getProfesorById(id: number, req: Request, res: Response){
    const profesor = this.profesorRepository.getProfesorById(id);
  
    if (profesor) {
      res.status(200).send(profesor); 
    } else {
      res.status(404).send({ error: 'Profesor no encontrado'});
    }
  }

  public createProfesor(req: Request, res: Response) {
    const { id, numeroEmpleado, nombres, apellidos, horasClase } = req.body;
    
    const nuevoProfesor = new Profesor(id, numeroEmpleado, nombres, apellidos, horasClase);
  
    if (!nuevoProfesor.isValid()) {
      res.status(400).send({ error: 'Datos de profesor no válidos'});
      return;
    }
  
    this.profesorRepository.addProfesor(nuevoProfesor);
    res.status(201).send({ message: 'Profesor creado exitosamente'});
  }

  public updateProfesor(id: number, req: Request, res: Response){
    const { numeroEmpleado, nombres, apellidos, horasClase } = req.body;
  
    const updatedProfesor = new Profesor(id, numeroEmpleado, nombres, apellidos, horasClase);
  
    if (!updatedProfesor.isValid()) {
      res.status(400).send({ error: 'Datos de profesor no válidos'}); 
      return;
    }
  
    const updated = this.profesorRepository.updateProfesor(updatedProfesor);
  
    if (updated) {
      res.status(200).send({ message: 'Profesor actualizado exitosamente'}); 
    } else {
      res.status(404).send({ error: 'Profesor no encontrado para actualizar'});
    }
  }

  public deleteProfesor(id: number,req: Request, res: Response){
    const deleted = this.profesorRepository.deleteProfesor(id);
  
    if (deleted) {
      res.status(200).send({ message: 'Profesor eliminado exitosamente'});
    } else {
      res.status(404).send({ error: 'Profesor no encontrado para eliminar'});
    }
  }
}
