// ViewModel de ejemplo (para front MVC/MVVM con EJS)
class CajeroViewModel {
  saldo = 0;
  async cargarSaldo(api, cuentaId) {
    const res = await fetch(`${api}/api/cajero/saldo/${cuentaId}`);
    const data = await res.json();
    this.saldo = data.saldo;
    return data;
  }
}

module.exports = CajeroViewModel;