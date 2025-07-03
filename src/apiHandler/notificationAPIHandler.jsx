import apiClient from "../services/axiosConfig";

const rootNotification = "/notifications";

export const getUserNotifications = async (userId) => {
  if (!userId) throw new Error("userId is required");
  const response = await apiClient.get(`${rootNotification}/user/${userId}`);
  return response.data;
};

export const markNotificationAsRead = async (notificationId) => {
  if (!notificationId) throw new Error("notificationId is required");
  const response = await apiClient.post(
    `${rootNotification}/${notificationId}/mark-as-read`
  );
  return response.data;
};
