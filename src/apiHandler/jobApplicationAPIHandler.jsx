import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const rootJobApplication = `${API_URL}/api/applications`;
const getAuthHeaders = () => {
  const token = sessionStorage.getItem("accessToken");
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  };
};
export const getJobApplication = async (jobId) => {
  const response = await axios.get(`${rootJobApplication}/job/${jobId}`);
  return response.data;
};

export const selectTranslatorForJob = async (jobId, interpreterId) => {
  try {
    const response = await axios.post(
      `${API_URL}/select`,
      { jobId, interpreterId },
      {
        headers: getAuthHeaders(),
        timeout: 10000,
      }
    );
    return response.data;
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
    throw error;
  }
};
