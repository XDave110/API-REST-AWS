export class Alumno {
  constructor(
    public id: number,
    public nombres: string,
    public apellidos: string,
    public matricula: string,
    public promedio: number
  ) { }

  isValid(): boolean {
    return (
      typeof this.id === 'number' &&
      typeof this.promedio === 'number' && this.promedio > 0 &&
      typeof this.nombres === 'string' && this.nombres.length > 0 &&
      typeof this.apellidos === 'string' && this.apellidos.length > 0 &&
      typeof this.matricula === 'string' && this.matricula.length > 0
    );
  }


}
