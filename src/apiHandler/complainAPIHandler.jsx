import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const rootComplaint = `${API_URL}/api/Complaint`;
const getAuthHeaders = () => {
  const token = sessionStorage.getItem("accessToken");
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  };
};

// Lấy danh sách khiếu nại của user hiện tại
export const getComplaints = async () => {
  const response = await axios.get(`${rootComplaint}`, {
    headers: getAuthHeaders(),
  });
  return response.data;
};

// Tạo khiếu nại mới (kèm tin nhắn đầu tiên)
export const createComplaint = async (data) => {
  const response = await axios.post(`${rootComplaint}`, data, {
    headers: getAuthHeaders(),
  });
  return response.data;
};

// Lấy danh sách tin nhắn của một khiếu nại
export const getComplaintMessages = async (complaintId) => {
  const response = await axios.get(`${rootComplaint}/${complaintId}/messages`, {
    headers: getAuthHeaders(),
  });
  return response.data;
};

// Gửi tin nhắn mới vào khiếu nại
export const sendComplaintMessage = async (complaintId, data) => {
  const response = await axios.post(
    `${rootComplaint}/${complaintId}/messages`,
    data,
    {
      headers: getAuthHeaders(),
    }
  );
  return response.data;
};

// Lấy tất cả khiếu nại (admin)
export const getAllComplaints = async () => {
  const response = await axios.get(`${rootComplaint}/all`, {
    headers: getAuthHeaders(),
  });
  return response.data;
};

// Đổi trạng thái khiếu nại (admin)
export const updateComplaintStatus = async (id, status) => {
  const response = await axios.patch(
    `${rootComplaint}/${id}/status`,
    { status },
    { headers: getAuthHeaders() }
  );
  return response.data;
};

// Admin xử lý khiếu nại tài chính (resolve)
export const resolveComplaint = async (id, data) => {
  const response = await axios.post(`${rootComplaint}/${id}/resolve`, data, {
    headers: getAuthHeaders(),
  });
  return response.data;
};
