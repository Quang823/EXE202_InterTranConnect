import apiClient from '../services/axiosConfig';

const rootSubPlan = '/SubPlan';
const rootSubscription = '/Subscription';

export const getSubPlans = async () => {
  try {
    const response = await apiClient.get(rootSubPlan);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const subscribeToPlan = async (subscriptionPlanId) => {
  try {
    const response = await apiClient.post(`${rootSubscription}/subscribe`, { subscriptionPlanId });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCurrentSubPlans = async () => {
  try {
    const response = await apiClient.get(`${rootSubscription}/current`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
