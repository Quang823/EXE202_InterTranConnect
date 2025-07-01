import apiClient from "../services/axiosConfig";

const rootJobApplication = "/JobApplication";

export const getJobApplication = async (jobId) => {
  const response = await apiClient.get(
    `${rootJobApplication}/${jobId}/applications`
  );
  return response.data;
};

export const selectTranslatorForJob = async (jobId, interpreterId) => {
  try {
    const response = await apiClient.post(
      "/select",
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
