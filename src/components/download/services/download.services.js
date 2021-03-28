import axios from "axios";

const API_URL = process.env.API_URL

export const createHeaders = () => {
  const headers = {
    'accept': 'application/json',
    'Content-Type': 'application/json'
  }
  return headers;

}

export const getResourceById = async (fileName, folder, token) => {
  try {
    const headers = createHeaders();
    headers['Authorization'] = `Bearer ${token}`;
    const url = `${API_URL}/files/${folder}/${fileName}`;
    const response = await axios.get(url, {
      headers,
      responseType: 'blob'
    });
    return response;
  } catch (error) {
    console.error('getResourceById:', error);
    return error;
  }
}