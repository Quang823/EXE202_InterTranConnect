import apiClient from "../services/axiosConfig";

const rootTrans = "/TranslatorCertificate";

export const getTranslatorCertificates = async (userId) => {
  try {
    const response = await apiClient.get(`${rootTrans}/user/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateTranslatorCertificate = async (userId, certificateData) => {
  try {
    const response = await apiClient.post(
      `${rootTrans}/user/${userId}`,
      certificateData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getTranslatorCertificateStatus = async (userId) => {
  try {
    const response = await apiClient.get(`${rootTrans}/status/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
