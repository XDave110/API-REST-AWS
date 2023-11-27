class InMemoryRepository {
  private data: any[]; // Aquí deberías utilizar el tipo específico de tu entidad

  constructor() {
    this.data = [];
  }

  getAll() {
    return this.data;
  }

  getById(id: any) {
    const stringId: string = String(id);
    const foundItem = this.data.find(item => String(item.id) === stringId);
    return foundItem;
  }

  create(entity: any) {
    if (!entity.id) {
      throw new Error('El elemento debe tener un ID');
    }
    this.data.push(entity);
  }

  update(id: any, updatedEntity: any) {
    const parsedId: number = parseInt(id, 10); // Convertir el ID a entero
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

  delete(id: any) {
    const stringId: string = String(id);
    this.data = this.data.filter(item => String(item.id) !== stringId);
  }
}

export default InMemoryRepository;
