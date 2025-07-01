import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const rootWallet = `${API_URL}/api/wallets`;
const rootWithdrawal = `${API_URL}/api/withdrawal-requests`;
const getAuthHeaders = () => {
  const token = sessionStorage.getItem("accessToken");
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  };
};

export const getWallet = async (accountId) => {
  const response = await axios.get(`${rootWallet}/${accountId}`, {
    headers: getAuthHeaders(),
  });
  return response.data;
};

export const depositWallet = async (accountId, amount, orderCode) => {
  const response = await axios.post(
    `${rootWallet}/${accountId}/deposit`,
    null,
    {
      params: { amount, orderCode },
      headers: getAuthHeaders(),
    }
  );
  return response.data;
};

export const purchaseWallet = async (accountId, amount, orderId) => {
  const response = await axios.post(
    `${rootWallet}/${accountId}/purchase`,
    null,
    {
      params: { amount, orderId },
      headers: getAuthHeaders(),
    }
  );
  return response.data;
};

export const getWalletTransactions = async (walletId, pageNumber, pageSize) => {
  const response = await axios.get(`${rootWallet}/${walletId}/transactions`, {
    params: {
      pageNumber,
      pageSize,
    },
    headers: getAuthHeaders(),
  });
  return response.data;
};

// Tạo yêu cầu rút tiền
export const createWithdrawalRequest = async (data) => {
  const response = await axios.post(`${rootWithdrawal}`, data, {
    headers: getAuthHeaders(),
  });
  return response.data;
};

// Xác nhận đã nhận tiền rút
export const confirmWithdrawalReceived = async (id) => {
  const response = await axios.post(
    `${rootWithdrawal}/${id}/confirm-received`,
    null,
    {
      headers: getAuthHeaders(),
    }
  );
  return response.data;
};

// Lấy các yêu cầu rút tiền của chính mình
export const getMyWithdrawalRequests = async () => {
  const response = await axios.get(`${rootWithdrawal}/my-requests`, {
    headers: getAuthHeaders(),
  });
  return response.data;
};
