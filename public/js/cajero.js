async function consultarSaldo() {
  const cuentaId = document.getElementById('cuentaId')?.value;
  if (!cuentaId) return;
  const res = await fetch(`/api/cajero/saldo/${cuentaId}`);
  const data = await res.json();
  document.getElementById('saldo-result').textContent = JSON.stringify(data, null, 2);
}

async function consultarSaldoTarjeta() {
  const numeroTarjetaRaw = document.getElementById('numeroTarjeta').value.trim();
  const numeroTarjeta = numeroTarjetaRaw.replace(/\D/g, '');
  const resultEl = document.getElementById('saldo-tarjeta-result');
  resultEl.textContent = '';

  if (!numeroTarjeta || numeroTarjeta.length < 12) {
    resultEl.textContent = 'Error: número de tarjeta inválido';
    return;
  }

  try {
    const res = await fetch(`/api/cajero/consulta`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ numeroTarjeta })
    });

    const contentType = res.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      const text = await res.text();
      throw new Error(`Respuesta no JSON (${res.status}): ${text.slice(0, 80)}...`);
    }

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || `Error (${res.status}) al consultar saldo`);
    resultEl.textContent = JSON.stringify(data, null, 2);
  } catch (err) {
    resultEl.textContent = `Error: ${err.message}`;
  }
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