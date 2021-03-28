import axios from "axios";

const API_URL = process.env.API_URL;
const MODEL_PROFILE = process.env.MODEL_PROFILE;

export const createHeaders = () => {
  const headers = {
    'accept': 'application/json',
    'Content-Type': 'application/json'
  }
  return headers;
}

export const getInfoModel = async (model, token) => {
  try {
    const headers = createHeaders();
    headers['Authorization'] = `Bearer ${token}`;
    const url = `${API_URL}/${model}`;
    const { data } = await axios.get(url, { headers });
    return (data.length > 0) ? data : [];
  } catch (error) {
    console.error(`${model}-> getModel:`, error);
    return error;
  }
}

export const getProfile = async () => {
  try {
    const headers = createHeaders();
    const url = `${API_URL}/${MODEL_PROFILE}`;
    const { data } = await axios.get(url, { headers });
    return (data.length > 0) ? data[0] : [];
  } catch (error) {
    console.error(`getProfile:`, error);
    return error;
  }
}


