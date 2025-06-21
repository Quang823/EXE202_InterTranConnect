import { getSubPlans as getSubPlansAPI, subscribeToPlan as subscribeToPlanAPI } from "../apiHandler/subPlanAPIHandler";

export const getSubPlans = async () => {
    try {
        const response = await getSubPlansAPI();
        return response;
    } catch (error) {
        console.error("Error fetching subscription plans:", error);
        throw error;
    }
};

export const subscribeToPlan = async (subscriptionPlanId) => {
    try {
        const response = await subscribeToPlanAPI(subscriptionPlanId);
        return response;
    } catch (error) {
        console.error("Error subscribing to plan:", error);
        throw error;
    }
}; 