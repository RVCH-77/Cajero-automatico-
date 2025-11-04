async function consultarSaldo() {
  const cuentaId = document.getElementById('cuentaId').value;
  const res = await fetch(`/api/cajero/saldo/${cuentaId}`);
  const data = await res.json();
  document.getElementById('saldo-result').textContent = JSON.stringify(data, null, 2);
}

async function retirar() {
  const numeroTarjeta = document.getElementById('numeroTarjeta').value.trim();
  const monto = parseFloat(document.getElementById('montoRetiro').value);
  const nip = document.getElementById('nip').value.trim();
  const cajeroId = parseInt(document.getElementById('cajeroId').value, 10);
  const esOtroBanco = document.getElementById('esOtroBanco').checked;

  const resultEl = document.getElementById('retirar-result');
  resultEl.textContent = '';

  try {
    const res = await fetch('/api/cajero/retirar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ numeroTarjeta, monto, nip, cajeroId, esOtroBanco })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Error al retirar');
    resultEl.textContent = JSON.stringify(data, null, 2);
  } catch (err) {
    resultEl.textContent = `Error: ${err.message}`;
  }
}