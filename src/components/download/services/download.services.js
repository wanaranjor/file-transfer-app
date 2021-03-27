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
    const url = `${API_URL}/files/${folder}/${fileName}`
    const { data } = await axios.get(url, { headers });
    console.log(data);
    return (data.length > 0) ? data : [];
  } catch (error) {
    console.error('getResources:', error);
    return error;
  }
}