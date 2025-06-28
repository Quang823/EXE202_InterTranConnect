import apiClient from '../services/axiosConfig';

const rootJob = '/job';

export const postJob = async (jobData) => {
  try {
    const response = await apiClient.post(`${rootJob}`, jobData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getJobsByCustomer = async (customerId) => {
  try {
    const response = await apiClient.get(`${rootJob}/by-customer/${customerId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getJobDetailByJobId = async (id) => {
  try {
    const response = await apiClient.get(`${rootJob}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllJobs = async () => {
  try {
    const response = await apiClient.get(`${rootJob}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
