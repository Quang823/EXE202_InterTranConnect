import {
  getReviewsByUser,
  getReviewsByJob,
  getReviewsByReviewee,
  getReviewSummary,
  getReviewableBPDVByJob,
  createReviewHandler,
} from "../apiHandler/reviewAPIHandler";

export const fetchReviewsByUser = async (userId) => {
  const response = await getReviewsByUser(userId);
  return response;
};

export const fetchReviewsByJob = async (jobId) => {
  const response = await getReviewsByJob(jobId);
  return response;
};

export const fetchReviewsByReviewee = async (revieweeId) => {
  const response = await getReviewsByReviewee(revieweeId);
  return response;
};

export const fetchReviewSummary = async (revieweeId) => {
  const response = await getReviewSummary(revieweeId);
  return response;
};

export const fetchReviewableBPDVByJob = async (jobId) => {
  const response = await getReviewableBPDVByJob(jobId);
  return response;
};

export const createReviewService = async (reviewData) => {
  const response = await createReviewHandler(reviewData);
  return response;
};
