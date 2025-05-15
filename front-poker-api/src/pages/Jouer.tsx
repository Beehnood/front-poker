const API_BASE_URL = 'http://localhost:3000/api';

export async function getTables() {
  const res = await fetch('${API_BASE_URL}/tables');
  return res.json();
}

export async function rejoindreTable(joueurId: any, tableId: any) {
  const res = await fetch(`http://localhost:5000/api/tables/{$tableId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ joueurId, tableId }),
  });
  return res.json();
}

export async function miser(joueurId: any, montant: any) {
  const response = await fetch(`${API_BASE_URL}/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ joueurId, montant })
  });
  return response.json();
}

export async function seCoucher(joueurId: any) {
  const response = await fetch(`${API_BASE_URL}/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ joueurId })
  });
  return response.json();
}