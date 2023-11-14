const express = require('express');
const AlumnoController = require('../controllers/AlumnoController');

const router = express.Router();
const alumnoController = new AlumnoController();

router.get('/alumnos', alumnoController.getAll.bind(alumnoController));
router.get('/alumnos/:id', alumnoController.getById.bind(alumnoController));
router.post('/alumnos', alumnoController.create.bind(alumnoController));
router.put('/alumnos/:id', alumnoController.update.bind(alumnoController));
router.delete('/alumnos/:id', alumnoController.delete.bind(alumnoController));

module.exports = router;
