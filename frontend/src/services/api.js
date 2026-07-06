const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const parseResponse = async (response) => {
  let payload = {};
  try {
    payload = await response.json();
  } catch (error) {
    // Keep payload empty when response is not JSON.
  }

  if (!response.ok) {
    const message = payload.detail || payload.message || 'Something went wrong.';
    throw new Error(message);
  }

  return payload;
};

export const fetchProducts = () => fetch(`${API_BASE}/products`).then(parseResponse);

export const fetchProductById = (id) => fetch(`${API_BASE}/products/${id}`).then(parseResponse);

export const submitCheckout = (payload) =>
  fetch(`${API_BASE}/checkout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  }).then(parseResponse);
