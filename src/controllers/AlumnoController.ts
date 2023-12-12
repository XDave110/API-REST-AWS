import { Request, Response } from 'express';
import { AlumnoRepository } from '../repository/AlumnoRepository';
import { Alumno } from "../entity/Alumno";
import { AlumnoValidatorService } from '../service/validateAlumnoService';
import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto';
import { DB } from '../infraestructura/DB';
import { S3Service } from '../infraestructura/awsBucket';
import * as fs from 'fs';


export class AlumnoController {
  constructor(
    private readonly s3Bucket: S3Service,
    private readonly dynamoDB: DB,
    private readonly alumnoRepository: AlumnoRepository,
    private readonly validateAlumno: AlumnoValidatorService
  ) {
    this.s3Bucket = new S3Service();
  }

  public async getAllAlumnos(req: Request, res: Response) {
    try {
      const items = await this.alumnoRepository.getAllAlumnos();
      res.status(200).json(items);
    } catch (error) {
      res.status(500).json({ error: 'Unable to fetch items' });
    }
  }

  public async getAlumnoById(id: number, req: Request, res: Response) {
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
      res.status(201).send({ status: 'Alumno creado exitosamente', id });
    } catch (error) {

    }
  }

  public async updateAlumno(id: number, req: Request, res: Response) {

    const { nombres, apellidos, matricula, promedio, password } = req.body;
    const updatedAlumno = new Alumno(nombres, apellidos, matricula, promedio, password)

    if (!this.validateAlumno.isValid(updatedAlumno)) {
      res.status(400).send({ erorr: 'Datos de alumno no válidos' });
      return;
    }


    try {
      const alumnoExistente = await this.alumnoRepository.getAlumnoById(id);
      if (!alumnoExistente) {
        res.status(404).send({ error: 'Alumno no encontrado' });
        return;
      }

      const updated = await this.alumnoRepository.updateAlumno(id, updatedAlumno);
      res.status(200).send({ status: 'Alumno actualizado exitosamente' });


    } catch (error) {
      res.status(500).send({ error: 'Error servidor' });
    }

  }
  public async deleteAlumno(id: number, req: Request, res: Response) {

    try {
      const alumnoExistente = await this.alumnoRepository.getAlumnoById(id);
      if (!alumnoExistente) {
        res.status(404).send({ error: 'Alumno no encontrado' });
        return;
      }
      const deleted = await this.alumnoRepository.deleteAlumno(id);
      res.status(200).send({ status: 'Alumno eliminado exitosamente' });
    } catch (error) {
      res.status(500).send({ error: 'Error servidor' });
    }
  }


  public generateRandomString(length: number): string {
    return crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);
  }

  public async loginAlumno(id: number, password: string, req: Request, res: Response) {
    try {
      const alumnoExistente = await this.alumnoRepository.getAlumnoById(id);
      if (!alumnoExistente) {
        res.status(404).send({ error: 'Alumno no encontrado' });
        return;
      }
      if (alumnoExistente.password !== password) {
        res.status(400).send({ error: 'Error contraseña' });
        return;
      }

      const uuid = uuidv4();
      const sessionString = this.generateRandomString(128);

      const data = {
        id: uuid,
        alumnoId: id,
        fecha: Math.floor(Date.now() / 1000),
        active: true,
        sessionString: sessionString,
      };
      const params = {
        TableName: 'sesiones-alumnos',
        Item: data
      };

      const registro = await this.dynamoDB.create(params);
      res.status(200).json({ status: 'subido correctamente', sessionString });
    } catch (error) {
      res.status(500).json({ error: 'Error al iniciar sesión', password });
    }
  }

  public async verifySession(id: number, req: Request, res: Response) {
    const { sessionString } = req.body;

    try {
      if (typeof sessionString !== 'string' || sessionString.length !== 128) {
        res.status(400).json({ error: 'Error en los datos de sesión' });
        return;
      }

      const alumnoExistente = await this.alumnoRepository.getAlumnoById(id);

      if (!alumnoExistente) {
        res.status(404).json({ error: 'Alumno no encontrado' });
        return;
      }

      const sessionData = await this.dynamoDB.getItemBySession(sessionString);
      const validSession = sessionData.find(
        (session: any) => session.sessionString === sessionString && session.active
      );

      if (validSession) {
        res.status(200).json({ message: 'Sesión válida' });
      } else {
        res.status(400).json({ error: 'Sesión no válida' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al verificar la sesión' });
    }
  }

  public async logoutAlumno(id: number, req: Request, res: Response) {
    const { sessionString } = req.body;

    try {
      const alumnoExistente = await this.alumnoRepository.getAlumnoById(id);
      if (!alumnoExistente) {
        res.status(404).send({ error: 'Alumno no encontrado' });
        return;
      }
      const logout = await this.dynamoDB.updateSession(sessionString);
      if (logout) {
        res.status(200).json({ message: 'Sesión cerrada exitosamente' });
      } else {
        res.status(400).json({ message: 'Error sesssion' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al cerrar sesión' });
    }
  }



  async uploadProfilePicture(alumnoId: number, req: Request, res: Response) {
    try {
      const alumnoExistente = await this.alumnoRepository.getAlumnoById(alumnoId);

      if (!alumnoExistente) {
        res.status(404).json({ error: 'Alumno no encontrado' });
        return;
      }
      const file = (req as any).file;
      const filePath = `alumnos/${alumnoId}/${file.originalname}`;
      const fileBuffer = fs.readFileSync(file.path);
      const url = await this.s3Bucket.uploadFileToBucket(filePath, fileBuffer);
      await this.alumnoRepository.updateAlumnoURl(alumnoId, url);
      res.status(200).json({ fotoPerfilUrl: url });
    } catch (error) {
      console.error('Error al procesar la imagen de perfil:', error);
      res.status(500).json({ error: 'Error al procesar la imagen de perfil' });
    }
  }


}


