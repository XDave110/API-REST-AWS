const AlumnoService = require("../services/alumnoService");
const InMemoryRepository = require("../repository/generalRepository");
const validateAlumnoData = require("../Validators/validateAlumno");

const alumnoService = new AlumnoService(new InMemoryRepository());

class AlumnoController {
  getAll(req, res) {
    const alumnos = alumnoService.getAll();
    res.json(alumnos);
  }

  getById(req, res) {
    const id = req.params.id;
    const alumno = alumnoService.getById(id);

    if (!alumno) {
      res.status(404).json({ message: "Alumno no encontrado" });
    } else {
      res.status(201).json(alumno);
    }
  }

  create(req, res) {
    try {
      validateAlumnoData(req.body);
      const existingAlumno = alumnoService.getById(req.body.id);
      if (existingAlumno) {
        res.status(400).json({ message: "El ID del alumno ya existe" });
      } else {
        const newAlumno = alumnoService.create(req.body);
        res.status(201).json(newAlumno);
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  update(req, res) {
    const id = req.params.id;
    try {
      validateAlumnoData(req.body);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }

    const existingAlumno = alumnoService.getById(id);
    if (!existingAlumno) {
      return res.status(404).json({ message: "Alumno no encontrado" });
    }

    const updatedAlumno = alumnoService.update(id, req.body);
    return res.json(updatedAlumno);
  }

  delete(req, res) {
    const id = req.params.id;
    const alumno = alumnoService.delete(id);

    if (!alumno) {
      res.status(404).json({ message: "Alumno no encontrado" });
    } else {
      res.json({ message: "Alumno eliminado correctamente" });
    }
  }
}

module.exports = AlumnoController;
