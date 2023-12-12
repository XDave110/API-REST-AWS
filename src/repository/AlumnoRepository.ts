import { PrismaClient } from "@prisma/client";
import { Alumno } from "../entity/Alumno";

const prisma = new PrismaClient();

export class AlumnoRepository {
    
   constructor(){}

    async getAllAlumnos(){
      return await prisma.alumno.findMany();
    }
  
    async getAlumnoById(id:number){
      return await prisma.alumno.findUnique({where: { id: id,}})
    }
  
    async addAlumno(alumno: Alumno){
      return await prisma.alumno.create(
        {data: {
          nombres: alumno.nombres,
          apellidos: alumno.apellidos,
          matricula:alumno.matricula,
        promedio: alumno.promedio,
        password: alumno.password,
        },}

      );
    }
  
    async updateAlumno(id:number, alumno:Alumno) {
      return await prisma.alumno.update({
        where: {
          id: id,
        },
        data: {
          nombres: alumno.nombres,
          apellidos: alumno.apellidos,
          matricula:alumno.matricula,
        promedio: alumno.promedio,
        password: alumno.password,
        },
      })
    }
    async updateAlumnoURl(id:number, fotoUrl: (string|null)) {
      return await prisma.alumno.update({
        where: {
          id: id,
        },
        data: {
          fotoPerfilUrl: fotoUrl,
        },
      })
    }
  
    async deleteAlumno(id: number){
      return await prisma.alumno.delete({where: {
        id: id
      }})
    }
  }