import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const rootAuth = `${API_URL}/api/auth`;

const getAuthHeaders = () => {
  const token = sessionStorage.getItem("accessToken");
  console.log(sessionStorage.getItem("accessToken"));

  return {
    Authorization: token ? `Bearer ${token}` : "",
    Accept: "application/json",
  };
};

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

export const assignRole = async (email, role) => {
  try {
    const response = await axios.post(`${rootAuth}/google/assign-role`, {
      email,
      role,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserByUserId = async (id) => {
  try {
    const response = await axios.get(`${rootAuth}/user/${id}`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateUserProfile = async (profileData) => {
  try {
    const response = await axios.put(`${rootAuth}/user/update`, profileData, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
