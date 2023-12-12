import { PrismaClient } from "@prisma/client";
import { Profesor } from "../entity/Profesor";

const prisma = new PrismaClient()

export class ProfesorRepository {

  constructor() {  }

  async getAllProfesores() {
    return await prisma.profesor.findMany()
  }

  async getProfesorById(id: number) {
    return await prisma.profesor.findUnique({where: {id: id}})
  }

  async addProfesor(profesor: Profesor) {
    return await prisma.profesor.create(
      {data: {
        numeroEmpleado: profesor.numeroEmpleado,
        nombres: profesor.nombres,
        apellidos: profesor.apellidos,
        horasClase: profesor.horasClase
      },

      }
    )
  }

  async updateProfesor(id: number, profesor: Profesor) {
    return await prisma.profesor.update({
      where:{
        id: id,
      },
      data: {
        numeroEmpleado: profesor.numeroEmpleado,
        nombres: profesor.nombres,
        apellidos: profesor.apellidos,
        horasClase: profesor.horasClase
      }
    })
  }

  async deleteProfesor(id: number){
    return await prisma.profesor.delete({
      where: { 
        id: id
      }
    })
  }
}
