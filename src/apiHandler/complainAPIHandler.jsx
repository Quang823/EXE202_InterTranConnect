import apiClient from "../services/axiosConfig";

const rootComplaint = "/Complaint";

// Lấy danh sách khiếu nại của user hiện tại
export const getComplaints = async () => {
  const response = await apiClient.get(`${rootComplaint}`);
  return response.data;
};

// Tạo khiếu nại mới (kèm tin nhắn đầu tiên)
export const createComplaint = async (data) => {
  const response = await apiClient.post(`${rootComplaint}`, data);
  return response.data;
};

// Lấy danh sách tin nhắn của một khiếu nại
export const getComplaintMessages = async (complaintId) => {
  const response = await apiClient.get(
    `${rootComplaint}/${complaintId}/messages`
  );
  return response.data;
};

// Gửi tin nhắn mới vào khiếu nại
export const sendComplaintMessage = async (complaintId, data) => {
  const response = await apiClient.post(
    `${rootComplaint}/${complaintId}/messages`,
    data
  );
  return response.data;
};

// Lấy tất cả khiếu nại (admin)
export const getAllComplaints = async () => {
  const response = await apiClient.get(`${rootComplaint}/all`);
  return response.data;
};

// Đổi trạng thái khiếu nại (admin)
export const updateComplaintStatus = async (id, status) => {
  const response = await apiClient.patch(`${rootComplaint}/${id}/status`, {
    status,
  });
  return response.data;
};

// Admin xử lý khiếu nại tài chính (resolve)
export const resolveComplaint = async (id, data) => {
  const response = await apiClient.post(`${rootComplaint}/${id}/resolve`, data);
  return response.data;
};
