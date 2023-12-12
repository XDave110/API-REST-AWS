import { Router } from 'express';
import { AlumnoController } from '../controllers/AlumnoController';
import { AlumnoRepository } from '../repository/AlumnoRepository';
import { AlumnoValidatorService } from '../service/validateAlumnoService';
import { DB } from '../infraestructura/awsDynamoDB';
import { S3Service } from '../infraestructura/awsBucket';
import multer from 'multer';
import { SNSService } from '../infraestructura/awsSNS';

const alumnoRouter = Router();
const alumnoController = new AlumnoController(new SNSService(), new S3Service(),new DB(),new AlumnoRepository(),new AlumnoValidatorService);
const upload = multer({ dest: 'uploads/' });

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

alumnoRouter.post('/alumnos/:id/fotoPerfil', upload.single('foto'),(req, res) => {
  const alumnoId: number = parseInt(req.params.id);
  alumnoController.uploadProfilePicture(alumnoId, req, res);
})

alumnoRouter.post('/alumnos/:id/session/login',(req, res) => {
  const alumnoId: number = parseInt(req.params.id);
  const alumnoPassword: string = req.body.password
  alumnoController.loginAlumno(alumnoId,alumnoPassword, req, res);
});

alumnoRouter.post('/alumnos/:id/session/verify', (req, res) => {
  const alumnoId: number = parseInt(req.params.id);
  alumnoController.verifySession(alumnoId, req, res);
});

alumnoRouter.post('/alumnos/:id/session/logout', (req, res) => {
  const alumnoId: number = parseInt(req.params.id);
  alumnoController.logoutAlumno(alumnoId, req, res);
});

alumnoRouter.post('/alumnos/:id/email',(req, res) => {
  const alumnoId: number = parseInt(req.params.id);
  alumnoController.sendMail(alumnoId, req, res);
});
export default alumnoRouter;
