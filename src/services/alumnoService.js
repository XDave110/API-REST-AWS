const Alumno = require('../entity/Alumno');

class AlumnoService {
  constructor(repository) {
    this.repository = repository;
  }

  getAll() {
    return this.repository.getAll();
  }

  getById(id) {
    return this.repository.getById(id);
  }

  create(data) {
    const { id, nombres, apellidos, matricula, promedio } = data;
    const newAlumno = new Alumno(id, nombres, apellidos, matricula, promedio);
    this.repository.create(newAlumno);

    return newAlumno;
  }

  update(id, data) {
    const { nombres, apellidos, matricula, promedio } = data;
    
    const updatedAlumno = new Alumno(id, nombres, apellidos, matricula, promedio);
    this.repository.update(id, updatedAlumno);

    return updatedAlumno;
  }

  delete(id) {
    const alumno = this.repository.getById(id);
    this.repository.delete(id);

    return alumno;
  }
}

module.exports = AlumnoService;
