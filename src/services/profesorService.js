const Profesor = require("../entity/Profesor");

class ProfesorService {
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
        const { id, numeroEmpleado, nombres, apellidos, horasClase } = data;

        const newProfesor = new Profesor(
            id,
            numeroEmpleado,
            nombres,
            apellidos,
            horasClase
        );
        this.repository.create(newProfesor);

        return newProfesor;
    }

    update(id, data) {
        const { numeroEmpleado, nombres, apellidos, horasClase } = data;

        const updatedProfesor = new Profesor(
            id,
            numeroEmpleado,
            nombres,
            apellidos,
            horasClase
        );
        this.repository.update(id, updatedProfesor);

        return updatedProfesor;
    }

    delete(id) {
        const profesor = this.repository.getById(id);
        this.repository.delete(id);

        return profesor;
    }
}

module.exports = ProfesorService;
