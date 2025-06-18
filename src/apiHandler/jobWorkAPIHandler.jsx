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
