import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
const rootJobWork = `${API_URL}/api/JobWork`;
const getAuthHeaders = () => {
  const token = sessionStorage.getItem("accessToken");
  return {
    Accept: "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  };
};

export const submitJobWork = async (jobId, interpreterId, resultFileUrl) => {
  try {
    const response = await axios.post(
      `${rootJobWork}/${jobId}/submit?interpreterId=${interpreterId}`,
      {
        resultFileUrl,
      },
      { headers: getAuthHeaders() }
    );
    return response.data;
  } catch (error) {
    console.error("Lỗi khi submit job work:", error);
    throw error;
  }
};

export const startJobWork = async (jobId, interpreterId) => {
  try {
    const response = await axios.post(
      `${rootJobWork}/${jobId}/start-work?interpreterId=${interpreterId}`,
      {},
      { headers: getAuthHeaders() }
    );
    return response.data;
  } catch (error) {
    console.error("Lỗi khi start job work:", error);
    throw error;
  }
};

export const confirmJobCompletion = async (jobId, customerId) => {
  try {
    const response = await axios.post(
      `${rootJobWork}/${jobId}/confirm-completion?customerId=${customerId}`,
      {},
      { headers: getAuthHeaders() }
    );
    return response.data;
  } catch (error) {
    console.error("Lỗi khi xác nhận hoàn thành công việc:", error);
    throw error;
  }
};
