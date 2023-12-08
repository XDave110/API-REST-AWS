import { Request, Response } from 'express';
import { Profesor } from "../entity/Profesor";
import { ProfesorRepository } from "../repository/ProfesorRepository";
import { ProfesorValidatorService } from '../service/validateProfesorService';

export class ProfesorController {
  constructor(
    private readonly profesorRepository: ProfesorRepository,
    private readonly validateProfesor: ProfesorValidatorService
    ){
  }
  
  public async getAllProfesores(req: Request, res: Response){
    try {
      const profesores = await this.profesorRepository.getAllProfesores();
      res.status(200).json(profesores);
    } catch (error) {
      res.status(500).json({ error: 'Unable to fetch items' });
    }
  }

  public async getProfesorById(id: number, req: Request, res: Response){
  try {
    const profesor = await this.profesorRepository.getProfesorById(id);
    if(profesor) {
      res.status(200).send(profesor); 
    }else{
      res.status(404).send({ error: 'Profesor no encontrado'});
    }
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch item' });
  }

  }

  public async createProfesor(req: Request, res: Response) {
    const { numeroEmpleado, nombres, apellidos, horasClase } = req.body;
    
    const nuevoProfesor = new Profesor( numeroEmpleado, nombres, apellidos, horasClase);
  
    if (!this.validateProfesor.isValid(nuevoProfesor)) {
      res.status(400).send({ error: 'Datos de profesor no válidos'});
      return;
    }
    
    try {
      const profesor = await this.profesorRepository.addProfesor(nuevoProfesor);
      const id = profesor.id;
      res.status(201).send({ message: 'Profesor creado exitosamente',id});
    } catch (error) {
      res.status(500).send({ error: 'Error al crear el alumno' });
    }
  
  }

  public async updateProfesor(id: number, req: Request, res: Response){
    const { numeroEmpleado, nombres, apellidos, horasClase } = req.body;
  
    const updatedProfesor = new Profesor( numeroEmpleado, nombres, apellidos, horasClase);
  
    if (!this.validateProfesor.isValid(updatedProfesor)) {
      res.status(400).send({ error: 'Datos de profesor no válidos'}); 
      return;
    }
  
    try {
      const profesorExistente = await this.profesorRepository.getProfesorById(id)
      if(!profesorExistente){
        res.status(404).send({ error: 'Profesor no encontrado'})
        return;
      }

      const updated = await this.profesorRepository.updateProfesor(id, updatedProfesor);
      res.status(200).send({ message: 'Profesor actualizado exitosamente'});

    } catch (error) {
      res.status(500).send({ error: 'Error servidor' });
    }
  
  }

  public async deleteProfesor(id: number,req: Request, res: Response){
try {
  const profesorExistente = await this.profesorRepository.getProfesorById(id)
      if(!profesorExistente){
        res.status(404).send({ error: 'Profesor no encontrado'})
        return;
      }
      const deleted = this.profesorRepository.deleteProfesor(id);
      res.status(200).send({ message: 'Profesor eliminado exitosamente'});
} catch (error) {
  res.status(500).send({error: 'Error servidor'});
}

  }
}
