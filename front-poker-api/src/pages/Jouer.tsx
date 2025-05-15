const API_BASE_URL = 'https://localhost:3000/api';

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