import apiClient from '../services/axiosConfig';

const rootPayment = '/payments';

export const createPayment = async ({ orderId, price }) => {
  const response = await apiClient.post(`${rootPayment}/createPayment`, {
    orderId,
    price,
  });
  return response.data;
};

export const createDeposit = async ({ accountId, price }) => {
  const response = await apiClient.post(`${rootPayment}/createDeposit`, {
    accountId,
    price,
  });
  return response.data;
};

export const getPaymentInfobyOrdercode = async (orderCode) => {
  const response = await apiClient.get(`${rootPayment}/${orderCode}`);
  return response.data;
};

export const payInterpreter = async ({
  jobId,
  customerId,
  amount,
  interpreterId,
}) => {
  try {
    const response = await apiClient.post(`${rootPayment}/pay-interpreter`, {
      jobId,
      customerId,
      amount,
      interpreterId,
    });
    return response.data;
  } catch (error) {
    console.error("API error paying interpreter:", {
      url: error.config?.url,
      data: error.config?.data,
      message: error.response?.data || error.message,
      status: error.response?.status,
    });
    throw error;
  }
};
