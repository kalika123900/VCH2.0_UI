import qs from 'qs';

export async function postData(url, data, token) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${token}`
    },
    body: qs.stringify(data)
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
