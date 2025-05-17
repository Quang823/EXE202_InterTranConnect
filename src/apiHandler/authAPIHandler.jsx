import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const rootAuth = `${API_URL}/api/auth`;

export const loginUser = async (userName, password) => {
  try {
    const response = await axios.post(`${rootAuth}/login`, {
      userName,
      password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${rootAuth}/register`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const googleLogin = async (token) => {
  try {
    const response = await axios.post(`${rootAuth}/google-login`, { token });
    return response.data;
  } catch (error) {
    throw error;
  }
};
