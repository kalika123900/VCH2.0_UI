

export async function postData(url, data, token) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });

  return await response.json();
}

export async function getData(url, token) {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return await response.json();
}

export async function postFormData(url, data) {
  const response = await fetch(url, {
    method: 'POST',
    body: data
  });
  return await response.json();
}