function validateProfesorData(data) {
    const errors = [];

    const requiredFields = [ 'numeroEmpleado', 'nombres', 'apellidos', 'horasClase'];
    for (const field of requiredFields) {
        if (!data[field]) {
            errors.push(`${field} es obligatorio.`);
        }
    }

    const validations = [
        { field: 'nombres', type: 'string', condition: (val) => typeof val === 'string' && val.trim() !== '' },
        { field: 'apellidos', type: 'string', condition: (val) => typeof val === 'string' && val.trim() !== '' },
        { field: 'numeroEmpleado',type: 'number', condition: (val) => typeof val === 'number' &&val >= 0  },
        { field: 'horasClase', type: 'number', condition: (val) => typeof val === 'number' &&val >= 0  }
    ];

    for (const { field, type, condition } of validations) {
        const value = data[field];
        const isValidType = typeof value === type;
        const isValidCondition = condition ? condition(value) : true;

        if (!isValidType || !isValidCondition) {
            errors.push(`${field} debe ser un ${type}`);
        }
    }

    if (errors.length > 0) {
        throw new Error(errors.join(' '));
    }
}

module.exports = validateProfesorData;
