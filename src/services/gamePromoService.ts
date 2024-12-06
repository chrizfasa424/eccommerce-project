const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function playSpinWheel(token: string) {
  const response = await fetch(`${API_BASE_URL}/api/games/spin-wheel`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  });
  return response.json();
}

export async function playMatchCard(token: string) {
  const response = await fetch(`${API_BASE_URL}/api/games/match-card`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  });
  return response.json();
}

export async function getMyGamePromos(token: string) {
  const response = await fetch(`${API_BASE_URL}/api/games/my-promos`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  });
  return response.json();
}

export async function canPlayGame(token: string, gameType: string) {
  const response = await fetch(`${API_BASE_URL}/api/games/can-play/${gameType}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  });
  return response.json();
} 