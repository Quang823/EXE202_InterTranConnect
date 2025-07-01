import {
  getUserNotifications,
  markNotificationAsRead,
} from "../apiHandler/notificationAPIHandler";

export const fetchUserNotifications = async (userId) => {
  try {
    if (!userId) throw new Error("userId is required");
    return await getUserNotifications(userId);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    throw error;
  }
};

export const markNotificationAsReadService = async (notificationId) => {
  try {
    if (!notificationId) throw new Error("notificationId is required");
    return await markNotificationAsRead(notificationId);
  } catch (error) {
    console.error("Error marking notification as read:", error);
    throw error;
  }
};
