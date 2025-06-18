import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const rootTrans = `${API_URL}/api/TranslatorCertificate`;

const getAuthHeaders = () => {
  const token = sessionStorage.getItem("accessToken");
  return {
    Authorization: token ? `Bearer ${token}` : "",
    Accept: "application/json",
    "Content-Type": "application/json",
  };
};

export const getTranslatorCertificates = async (userId) => {
  try {
    const response = await axios.get(`${rootTrans}/user/${userId}`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateTranslatorCertificate = async (userId, certificateData) => {
  try {
    const response = await axios.post(
      `${rootTrans}/user/${userId}`,
      certificateData,
      {
        headers: getAuthHeaders(),
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
