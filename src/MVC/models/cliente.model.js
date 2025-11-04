// Modelo de dominio simple (sin ORM)
class ClienteModel {
  constructor({ id, nombre, documento }) {
    this.id = id;
    this.nombre = nombre;
    this.documento = documento;
  }
}

module.exports = ClienteModel;