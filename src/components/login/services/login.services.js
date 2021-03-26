import axios from "axios";
const API_URL = process.env.API_URL

export const createHeaders = () => {
  const headers = {
    'accept': 'application/json',
    'Content-Type': 'application/json'
  }
  return headers;
}

export const loginUser = async (email, password) => {
  try {
    const headers = createHeaders();
    const url = "auth/login";
    const response = await axios.post(url, {
      email: email.trim(),
      password: password,
    }, { headers });
    return response.data;
  } catch (error) {
    console.error('loginUser:', error);
    return error;
  }
}

export const logoutUser = async () => {
  try {
    const url = "auth/logout";
    const response = await axios.post(url);
    return response;
  } catch (error) {
    console.error('logoutUser:', error);
    return error;
  }
}

export const findUserById = async (id, token) => {
  try {
    const headers = createHeaders();
    headers['Authorization'] = `Bearer ${token}`;
    const url = `${API_URL}/users/${id}`;
    const response = await axios.get(url, { headers });
    return response;
  } catch (error) {
    console.error('findUserById:', error);
    return error.response.status;
  }
}