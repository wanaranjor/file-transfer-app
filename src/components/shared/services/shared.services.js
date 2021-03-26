import axios from "axios";

const API_URL = process.env.API_URL

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


// export const getUserById = async (userId, token) => {
//   try {
//     const headers = createHeaders();
//     headers['Authorization'] = `Bearer ${token}`;
//     const url = `${API_URL}/users/${userId}`;
//     const { data } = await axios.get(url, { headers });
//     return data;
//   } catch (error) {
//     console.error(`getUserById:`, error);
//     return error;
//   }
// }

// export const countInfoModelById = async (userId, model, token) => {
//   try {
//     const headers = createHeaders();
//     headers['Authorization'] = `Bearer ${token}`;
//     const url = `${API_URL}/${model}/count?filter={"where":{"userId":"${userId}"}}`;
//     const { data } = await axios.get(url, { headers });
//     return data.count;
//   } catch (error) {
//     console.error(`${model}-> countInfoModelById:`, error);
//     return error;
//   }
// }


