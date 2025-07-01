import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const rootNotification = `${API_URL}/api/notifications`;

export const getUserNotifications = async (userId) => {
  if (!userId) throw new Error("userId is required");
  const response = await axios.get(`${rootNotification}/user/${userId}`);
  return response.data;
};

export const markNotificationAsRead = async (notificationId) => {
  if (!notificationId) throw new Error("notificationId is required");
  const response = await axios.post(
    `${rootNotification}/${notificationId}/mark-as-read`
  );
  return response.data;
};
