import apiClient from "../services/axiosConfig";

const rootReview = "/Review";

export const getReviewsByUser = async (userId) => {
  try {
    const response = await apiClient.get(`${rootReview}/user/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getReviewsByJob = async (jobId) => {
  try {
    const response = await apiClient.get(`${rootReview}/job/${jobId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getReviewsByReviewee = async (revieweeId) => {
  try {
    const response = await apiClient.get(
      `${rootReview}/reviewee/${revieweeId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getReviewSummary = async (revieweeId) => {
  try {
    const response = await apiClient.get(`${rootReview}/summary/${revieweeId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getReviewableBPDVByJob = async (jobId) => {
  try {
    const response = await apiClient.get(
      `${rootReview}/job/${jobId}/reviewable-bpdv`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createReviewHandler = async (reviewData) => {
  try {
    const response = await apiClient.post(`${rootReview}`, reviewData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
