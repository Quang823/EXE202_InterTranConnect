import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const rootJobApplication = `${API_URL}/api/JobApplication`;

export const getJobApplication = async (jobId) => {
  const response = await axios.get(
    `${rootJobApplication}/${jobId}/applications`
  );
  return response.data;
};

export const selectTranslatorForJob = async (jobId, interpreterId) => {
  const response = await axios.post(
    `${rootJobApplication}/${jobId}/select`,
    {},
    { params: { interpreterId } }
  );
  return response.data;
};
