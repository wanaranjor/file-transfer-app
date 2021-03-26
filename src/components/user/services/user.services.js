import axios from "axios";

const API_URL = process.env.API_URL
const URL_USER = process.env.URL_USER;

const createHeaders = () => {
  const headers = {
    'accept': 'application/json',
    'Content-Type': 'application/json'
  }
  return headers;
}

export const decodeToken = (token) => {
  const decoded = jwt_decode(token);
  return decoded;
}

export const addUser = async (
  username,
  areaId,
  responsable,
  email,
  password,
) => {
  try {
    const headers = createHeaders();
    // headers['Authorization'] = `Bearer ${token}`;
    const url = `${API_URL}/${URL_USER}`;
    const response = await axios.post(url, {
      username,
      areaId,
      responsable,
      email,
      password,
      createdAt: new Date()
    }, { headers });
    console.log(response.status);
    return response.status;
  } catch (error) {
    console.error('addUser:', error);
    return error;
  }
}

export const getUsers = async (model, token) => {
  try {
    const headers = createHeaders();
    headers['Authorization'] = `Bearer ${token}`;
    const url = `${API_URL}/${model}?filter={"include":["area"]}`;
    const { data } = await axios.get(url, { headers });
    return (data.length > 0) ? data : [];
  } catch (error) {
    console.error(`${model}-> getModel:`, error);
    return error;
  }
}

export const findUserById = async (id, token) => {
  try {
    const headers = createHeaders();
    headers['Authorization'] = `Bearer ${token}`;
    const url = `${API_URL}/users/${id}?filter={"include":["area"]}`;
    const { data } = await axios.get(url, { headers });
    return data;
  } catch (error) {
    console.error('findUserById:', error);
    return error.response.status;
  }
}