import { Request, Response } from 'express';
import { AlumnoRepository } from '../repository/AlumnoRepository';
import { Alumno } from "../entity/Alumno";
import { AlumnoValidatorService } from '../service/validateAlumnoService';

export class AlumnoController {
  constructor(
    private readonly alumnoRepository: AlumnoRepository,
    private readonly validateAlumno: AlumnoValidatorService
    ){
  }
  public async getAllAlumnos  (req: Request, res: Response){
    try {
      const items = await this.alumnoRepository.getAllAlumnos();
      res.status(200).json(items);
    } catch (error) {
      res.status(500).json({ error: 'Unable to fetch items' });
    }
  }

  public async getAlumnoById(id: number, req: Request, res: Response){
    try {
      const alumno = await this.alumnoRepository.getAlumnoById(id);
      if (alumno) {
        res.status(200).json(alumno);
      } else {
        res.status(404).json({ message: 'Item not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Unable to fetch item' });
    }

  }

  public async createAlumno(req: Request, res: Response) {
    const { nombres, apellidos, matricula, promedio, password } = req.body;

    const nuevoAlumno = new Alumno(nombres, apellidos, matricula, promedio, password);

    if (!this.validateAlumno.isValid(nuevoAlumno)) {
      res.status(400).send({ error: 'Datos de alumno no válidos' });
      return;
    }

    try {
      const alumno = await this.alumnoRepository.addAlumno(nuevoAlumno);
      const id = alumno.id; 
      res.status(201).send({ status: 'Alumno creado exitosamente', id});
    } catch (error) {
      
    }
  }

  public async updateAlumno(id: number,req: Request, res: Response){
    
    const { nombres, apellidos, matricula, promedio, password } = req.body;
    const updatedAlumno = new Alumno(nombres, apellidos, matricula, promedio, password)
  
    if (!this.validateAlumno.isValid(updatedAlumno)) {
      res.status(400).send({erorr: 'Datos de alumno no válidos'}); 
      return;
    }
  
   
  try {
    const alumnoExistente = await this.alumnoRepository.getAlumnoById(id);
    if (!alumnoExistente) {
      res.status(404).send({ error: 'Alumno no encontrado' });
      return;
    }
   
    const updated = await this.alumnoRepository.updateAlumno(id,updatedAlumno);
    res.status(200).send({status: 'Alumno actualizado exitosamente'}); 
    
      
  } catch (error) {
    res.status(500).send({ error: 'Error servidor' });
  }
   
  }
  public async deleteAlumno(id: number, req: Request, res: Response){
  
    
  try {
    const alumnoExistente = await this.alumnoRepository.getAlumnoById(id);
    if (!alumnoExistente) {
      res.status(404).send({ error: 'Alumno no encontrado' });
      return;
    }
    const deleted = await this.alumnoRepository.deleteAlumno(id);
    res.status(200).send({status: 'Alumno eliminado exitosamente'});
  } catch (error) {
    res.status(500).send({error: 'Error servidor'});
  }
  }

}