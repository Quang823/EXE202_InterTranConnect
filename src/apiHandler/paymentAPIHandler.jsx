import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const rootPayment = `${API_URL}/api/payments`;
const getAuthHeaders = () => {
  const token = sessionStorage.getItem("accessToken");
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  };
};

export const createPayment = async ({ orderId, price }) => {
  const response = await axios.post(
    `${rootPayment}/createPayment`,
    {
      orderId,
      price,
    },
    { headers: getAuthHeaders() }
  );
  return response.data;
};

export const createDeposit = async ({ accountId, price }) => {
  const response = await axios.post(
    `${rootPayment}/createDeposit`,
    {
      accountId,
      price,
    },
    { headers: getAuthHeaders() }
  );
  return response.data;
};

export const getPaymentInfobyOrdercode = async (orderCode) => {
  const response = await axios.get(`${rootPayment}/${orderCode}`, {
    headers: getAuthHeaders(),
  });
  return response.data;
};

export const payInterpreter = async ({ jobId, customerId, amount }) => {
  try {
    const response = await axios.post(
      `${rootPayment}/pay-interpreter`,
      {
        jobId,
        customerId,
        amount,
      },
      { headers: getAuthHeaders() }
    );
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
