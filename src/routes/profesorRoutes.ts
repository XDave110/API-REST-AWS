import { Router } from "express";
import { ProfesorController } from "../controllers/ProfesorController";
import { ProfesorRepository } from "../repository/ProfesorRepository";

const profesorRouter = Router();
const profesorController = new ProfesorController(new ProfesorRepository())

profesorRouter.get('/profesores', profesorController.getAllProfesores.bind(profesorController));

profesorRouter.get('/profesores/:id', (req, res) => {
  const profesorId: number = parseInt(req.params.id);
  profesorController.getProfesorById(profesorId, req, res);
});

profesorRouter.post('/profesores', profesorController.createProfesor.bind(profesorController));

profesorRouter.put('/profesores/:id', (req, res) => {
  const profesorId: number = parseInt(req.params.id);
  profesorController.updateProfesor(profesorId, req, res);
});

profesorRouter.delete('/profesores/:id', (req, res) => {
  const profesorId: number = parseInt(req.params.id);
  profesorController.deleteProfesor(profesorId, req, res);
});

profesorRouter.all('/profesores', (_, res) => {
  res.status(405).send('Método no permitido');
});

export default profesorRouter;
