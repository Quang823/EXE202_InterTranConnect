import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const rootJob = `${API_URL}/api/job`;

export const postJob = async (jobData) => {
  try {
    const response = await axios.post(`${rootJob}`, jobData);
    return response.data;
  } catch (error) {
    throw error;
  }
};