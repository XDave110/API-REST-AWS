class InMemoryRepository {
  constructor() {
    this.data = [];
  }

  getAll() {
    return this.data;
  }

  getById(id) {
    const stringId = String(id); 
    const foundItem = this.data.find(item => String(item.id) === stringId);
    return foundItem;
  }
  
  create(entity) {
    if (!entity.id) {
      throw new Error('El elemento debe tener un ID');
    }
    this.data.push(entity);
  }

  update(id, updatedEntity) {
    const parsedId = parseInt(id); // Convertir el ID a entero
    const index = this.data.findIndex(item => item.id === parsedId);
  
    if (index !== -1) {
      if (!updatedEntity.id) {
        throw new Error('El elemento debe tener un ID');
      }
      this.data[index] = { ...this.data[index], ...updatedEntity };
      this.data[index].id = parsedId; // Asignar el ID como número
      return this.data[index]; 
    } else {
      throw new Error('No se encontró el elemento para actualizar');
    }
  }
  
  
  delete(id) {
    const stringId = String(id);
    this.data = this.data.filter(item => String(item.id) !== stringId);
  }
  
}

module.exports = InMemoryRepository;
