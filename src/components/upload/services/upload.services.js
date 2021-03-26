import axios from "axios";
import { valueProgressBar } from "../stores/upload.storage"

const API_URL = process.env.API_URL

export const createHeaders = () => {
  const headers = {
    'accept': 'application/json',
    'Content-Type': 'multipart/form-data'
  }
  return headers;
}

export const uploadFile = async (formData, folder) => {
  try {
    const headers = createHeaders();
    const url = `${API_URL}/${folder.toLowerCase()}`;
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
  fileName, fileType, fileSize, fileUrl, areaId
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
      areaId,
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
    const { data } = await axios.get(url);
    return (data.length > 0) ? data : [];
  } catch (error) {
    console.error('getResources:', error);
    return error;
  }
}