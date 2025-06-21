import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const rootSubPlan = `${API_URL}/api/SubPlan`;
const rootSubscription = `${API_URL}/api/Subscription`;

const getAuthHeaders = () => {
  const token = sessionStorage.getItem("accessToken");
  return {
    Authorization: token ? `Bearer ${token}` : "",
    Accept: "*/*",
  };
};

export const getSubPlans = async () => {
  try {
    const response = await axios.get(rootSubPlan, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const subscribeToPlan = async (subscriptionPlanId) => {
  try {
    const response = await axios.post(`${rootSubscription}/subscribe`, { subscriptionPlanId }, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}; 