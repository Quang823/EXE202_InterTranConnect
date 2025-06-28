import apiClient from '../services/axiosConfig';

const rootJobWork = '/JobWork';

export const submitJobWork = async (jobId, interpreterId, resultFileUrl) => {
  try {
    const response = await apiClient.post(
      `${rootJobWork}/${jobId}/submit?interpreterId=${interpreterId}`,
      {
        resultFileUrl,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Lỗi khi submit job work:", error);
    throw error;
  }
};

export const startJobWork = async (jobId, interpreterId) => {
  try {
    const response = await apiClient.post(
      `${rootJobWork}/${jobId}/start-work?interpreterId=${interpreterId}`,
      {}
    );
    return response.data;
  } catch (error) {
    console.error("Lỗi khi start job work:", error);
    throw error;
  }
};

export const confirmJobCompletion = async (jobId, customerId) => {
  try {
    const response = await apiClient.post(
      `${rootJobWork}/${jobId}/confirm-completion?customerId=${customerId}`,
      {}
    );
    return response.data;
  } catch (error) {
    console.error("Lỗi khi xác nhận hoàn thành công việc:", error);
    throw error;
  }
};
