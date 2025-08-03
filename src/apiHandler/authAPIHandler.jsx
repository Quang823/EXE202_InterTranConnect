import axios from "axios";
import apiClient from "../services/axiosConfig";

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
    const response = await apiClient.get(`/auth/user/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateUserProfile = async (profileData) => {
  try {
    const response = await apiClient.put(`/auth/user/update`, profileData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateBankAccount = async (bankAccountData) => {
  try {
    const response = await apiClient.put(`/auth/bank-account`, bankAccountData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const refreshToken = async (refreshToken) => {
  try {
    const response = await axios.post(`${rootAuth}/refresh-token`, {
      refreshToken,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const adminRegisterUser = async (userData) => {
  try {
    const response = await apiClient.post(`${rootAuth}/registermb`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
