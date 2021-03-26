import axios from 'axios';
const API_URL = process.env.API_URL


export const createHeaders = () => {
  const headers = {
    'accept': 'application/json',
    'Content-Type': 'application/json',
  }
  return headers;
}

export const post = async (req, res) => {
  try {
    const headers = createHeaders();
    const { email, password } = req.body;
    const response = await axios.post(`${API_URL}/login`, {
      email,
      password
    }, { headers });
    req.session.user = {
      token: response.token,
      data: response.data,
    };
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(req.session.user.data));
  } catch (error) {
    res.end(JSON.stringify({ error: error.message }));
  }
}