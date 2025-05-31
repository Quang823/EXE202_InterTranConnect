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

export const getJobsByCustomer = async (customerId) => {
  try {
    const response = await axios.get(`${rootJob}/by-customer/${customerId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getJobDetailByJobId = async (id) => {
  try {
    const response = await axios.get(`${rootJob}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
