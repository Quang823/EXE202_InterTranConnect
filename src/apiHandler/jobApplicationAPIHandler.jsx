import apiClient from "../services/axiosConfig";

const rootJobApplication = "/applications";

export const getJobApplication = async (jobId) => {
  const response = await apiClient.get(`${rootJobApplication}/job/${jobId}`);
  return response.data;
};

export const selectTranslatorForJob = async (jobId, interpreterId) => {
  try {
    const response = await apiClient.post(
      `${rootJobApplication}/select`,
      { jobId, interpreterId },
      {
        timeout: 10000,
      }
    );
    return response.data;
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
    throw error;
  }
};

export const getJobApplicationById = async (id) => {
  try {
    const response = await apiClient.get(`${rootJobApplication}/${id}`);
    return response.data;
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
    throw error;
  }
};
