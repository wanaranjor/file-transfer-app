import axios from "axios";
import { valueProgressBar } from "../stores/upload.storage"

const API_URL = process.env.API_URL
const URL_TELEM = process.env.URL_TELEM;

export const createHeaders = () => {
  const headers = {
    'accept': 'application/json',
    'Content-Type': 'multipart/form-data'
  }
  return headers;
}

export const uploadFile = async (formData) => {
  try {
    const headers = createHeaders();
    const url = `${API_URL}/${URL_TELEM}`;
    const response = await axios.post(url, formData, {
      headers,
      onUploadProgress(event) {
        let progress = Math.round((event.loaded * 100.0) / event.total);
        valueProgressBar.set(progress);
      }
    });
    return response;
  } catch (error) {
    console.error('uploadFile:', error);
    return error.response.data.error;
  }
}

export const addResource = async (
  fileName, fileType, fileSize, fileUrl
) => {
  try {
    // const headers = createHeaders();
    // headers['Authorization'] = `Bearer ${token}`;
    const url = `${API_URL}/resources`;
    const response = await axios.post(url, {
      fileName,
      fileType,
      fileSize,
      fileUrl,
      area: 'telem',
      createdAt: new Date()
    });
    return response;
  } catch (error) {
    console.error('addResource:', error);
    return error;
  }
}

export const getFilesType = async (area) => {
  try {
    // const headers = createHeaders();
    // headers['Authorization'] = `Bearer ${token}`;
    const url = `${API_URL}/files/${area}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('addResource:', error);
    return error;
  }
}

export const getResources = async () => {
  try {
    // const headers = createHeaders();
    // headers['Authorization'] = `Bearer ${token}`;
    const url = `${API_URL}/resources?filter[order]=createdAt DESC`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('addResource:', error);
    return error;
  }
}