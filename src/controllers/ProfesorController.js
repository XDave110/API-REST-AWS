const ProfesorService = require("../services/profesorService");
const InMemoryRepository = require("../repository/generalRepository");
const validateProfesorData = require("../Validators/validateProfesor");

const profesorService = new ProfesorService(new InMemoryRepository());

class ProfesorController {
  getAll(req, res) {
    const profesores = profesorService.getAll();
    res.json(profesores);
  }

  getById(req, res) {
    const id = req.params.id;
    const profesor = profesorService.getById(id);

    if (!profesor) {
      res.status(404).json({ message: "Profesor no encontrado" });
    } else {
      res.json(profesor);
    }
  }

  create(req, res) {
    try {
      validateProfesorData(req.body);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
    const existingProfesor = profesorService.getById(req.body.id);
    if (existingProfesor) {
      res.status(400).json({ message: "El ID ya existe" });
    } else {
      const newProfesor = profesorService.create(req.body);
      res.status(201).json(newProfesor);
    }
  }

  update(req, res) {
    const id = parseInt(req.body.id);

    try {
      validateProfesorData(req.body);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }

    const existingProfesor = profesorService.getById(id);
    if (!existingProfesor) {
      return res.status(404).json({ message: "Profesor no encontrado" });
    }

    const updatedProfesor = profesorService.update(id, req.body);
    return res.json(updatedProfesor);
  }

  delete(req, res) {
    const id = req.params.id;
    const profesor = profesorService.delete(id);
    if (!profesor) {
      res.status(404).json({ message: "Profesor no encontrado" });
    } else {
      res.json({ message: "Profesor eliminado correctamente" });
    }
  }
}

module.exports = ProfesorController;
