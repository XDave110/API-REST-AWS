import { Router } from 'express';
import { AlumnoController } from '../controllers/AlumnoController';
import { AlumnoRepository } from '../repository/AlumnoRepository';
import { AlumnoValidatorService } from '../service/validateAlumnoService';

const alumnoRouter = Router();
const alumnoController = new AlumnoController(new AlumnoRepository(),new AlumnoValidatorService);

alumnoRouter.get('/alumnos', alumnoController.getAllAlumnos.bind(alumnoController));

alumnoRouter.get('/alumnos/:id', (req, res) => {
  const alumnoId: number = parseInt(req.params.id);
  alumnoController.getAlumnoById(alumnoId, req, res);
});

alumnoRouter.post('/alumnos', alumnoController.createAlumno.bind(alumnoController));

alumnoRouter.put('/alumnos/:id', (req, res) => {
  const alumnoId: number = parseInt(req.params.id);
  alumnoController.updateAlumno(alumnoId, req, res);
});

alumnoRouter.delete('/alumnos/:id', (req, res) => {
  const alumnoId: number = parseInt(req.params.id);
  alumnoController.deleteAlumno(alumnoId, req, res);
});

alumnoRouter.all('/alumnos', (_, res) => {
  res.status(405).send('Método no permitido');
});

export default alumnoRouter;
