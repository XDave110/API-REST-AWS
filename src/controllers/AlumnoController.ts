import { Request, Response } from 'express';
import { AlumnoRepository } from '../repository/AlumnoRepository';
import { Alumno } from "../entity/Alumno";

export class AlumnoController {
  constructor(private readonly alumnoRepository: AlumnoRepository){
  }
  public getAllAlumnos(req: Request, res: Response){
    const alumnos = this.alumnoRepository.getAllAlumnos();
    res.status(200).send(alumnos); 
  }

  public getAlumnoById(id: number, req: Request, res: Response){
    const alumno = this.alumnoRepository.getAlumnoById(id);
  
    if (alumno) {
      res.status(200).send(alumno); 
    } else {
      res.status(404).send({error: 'Alumno no encontrado'});
    }
  }

  public createAlumno(req: Request, res: Response) {
    const { id, nombres, apellidos, matricula, promedio } = req.body;
    
    const nuevoAlumno = new Alumno(id, nombres, apellidos, matricula, promedio);
  
    if (!nuevoAlumno.isValid()) {
      res.status(400).send({ error: 'Datos de alumno no validos'})
      return;
    }
  
    this.alumnoRepository.addAlumno(nuevoAlumno);
    res.status(201).send({error:'Alumno creado exitosamente'});
  }

  public updateAlumno(id: number,req: Request, res: Response){
    
    const { nombres, apellidos, matricula, promedio } = req.body;
    const updatedAlumno = new Alumno(id,nombres,apellidos,matricula,promedio)
  
    if (!updatedAlumno.isValid()) {
      res.status(400).send({erorr: 'Datos de alumno no válidos'}); 
      return;
    }
  
    const updated = this.alumnoRepository.updateAlumno(updatedAlumno);
  
    if (updated) {
      res.status(200).send({error: 'Alumno actualizado exitosamente'}); 
    } else {
      res.status(404).send({errro: 'Alumno no encontrado para actualizar'});
    }
  }
  public deleteAlumno(id: number, req: Request, res: Response){
  
    const deleted = this.alumnoRepository.deleteAlumno(id);
  
    if (deleted) {
      res.status(200).send({error: 'Alumno eliminado exitosamente'});
    } else {
      res.status(404).send({error: 'Alumno no encontrado para eliminar'});
    }
  }

}