const express = require('express');
const ProfesorController = require('../controllers/ProfesorController');


const router = express.Router();
const profesorController = new ProfesorController();

router.get('/profesores', profesorController.getAll.bind(profesorController));
router.get('/profesores/:id', profesorController.getById.bind(profesorController));
router.post('/profesores', profesorController.create.bind(profesorController));
router.put('/profesores/:id', profesorController.update.bind(profesorController));
router.delete('/profesores/:id', profesorController.delete.bind(profesorController));

module.exports = router;