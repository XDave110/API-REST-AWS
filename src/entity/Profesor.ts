export class Profesor {
  constructor(
    public id: number,
    public numeroEmpleado: number,
    public nombres: string,
    public apellidos: string,
    public horasClase: number
  ) {}

  isValid(): boolean {
    return (
      typeof this.id === 'number' &&
      typeof this.horasClase === 'number' && this.horasClase > 0 &&
      typeof this.numeroEmpleado === 'number' && this.numeroEmpleado > 0 &&
      typeof this.nombres === 'string' && this.nombres.length > 0 &&
      typeof this.apellidos === 'string' && this.apellidos.length > 0
    );
  }
}