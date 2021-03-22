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
    return response.status;
  } catch (error) {
    console.error('uploadFile:', error);
    return error.response.data.error;
  }
}

// export const patchInfoContactos = async (
//   idDoc,
//   token,
//   nombresApellidos,
//   tipoDocumento,
//   numeroDocumento,
//   numeroFijo,
//   extension,
//   numeroCelular,
//   direccionCorreo
// ) => {
//   try {
//     const headers = createHeaders();
//     headers['Authorization'] = `Bearer ${token}`;
//     const url = `${API_URL}/${MODEL}/${idDoc}`;
//     const response = await axios.patch(url, {
//       nombresApellidos: nombresApellidos.toUpperCase(),
//       tipoDocumento: tipoDocumento.toUpperCase(),
//       numeroDocumento: numeroDocumento.toUpperCase(),
//       numeroFijo: numeroFijo.toUpperCase(),
//       extension: extension.toUpperCase(),
//       numeroCelular: numeroCelular.toUpperCase(),
//       direccionCorreo: direccionCorreo.toLowerCase()
//     }, { headers });
//     return response.status;
//   } catch (error) {
//     console.error('patchInfoLegal:', error);
//     throw error;
//   }
// }