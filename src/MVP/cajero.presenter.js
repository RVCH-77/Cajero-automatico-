// Presenter de ejemplo (traduciendo eventos de la vista a acciones)
class CajeroPresenter {
  constructor(service) { this.service = service; }
  async onConsultarSaldo(cuentaId) { return this.service.obtenerSaldo(cuentaId); }
  async onRetirar(cuentaId, monto) { return this.service.retirar(cuentaId, monto); }
}

module.exports = CajeroPresenter;