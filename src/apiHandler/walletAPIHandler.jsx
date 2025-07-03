import apiClient from "../services/axiosConfig";

const rootWallet = "/wallets";

export const getWallet = async (accountId) => {
  const response = await apiClient.get(`${rootWallet}/${accountId}`);
  return response.data;
};

export const depositWallet = async (accountId, amount, orderCode) => {
  const response = await apiClient.post(
    `${rootWallet}/${accountId}/deposit`,
    null,
    {
      params: { amount, orderCode },
    }
  );
  return response.data;
};

export const purchaseWallet = async (accountId, amount, orderId) => {
  const response = await apiClient.post(
    `${rootWallet}/${accountId}/purchase`,
    null,
    {
      params: { amount, orderId },
    }
  );
  return response.data;
};

export const getWalletTransactions = async (walletId, pageNumber, pageSize) => {
  const response = await apiClient.get(
    `${rootWallet}/${walletId}/transactions`,
    {
      params: {
        pageNumber,
        pageSize,
      },
    }
  );
  return response.data;
};

// Withdrawal requests
export const getMyWithdrawalRequests = async () => {
  const response = await apiClient.get("/withdrawal-requests/my-requests");
  return response.data;
};

export const getWithdrawalRequestById = async (id) => {
  const response = await apiClient.get(`/withdrawal-requests/${id}`);
  return response.data;
};

export const createWithdrawalRequest = async (data) => {
  const response = await apiClient.post("/withdrawal-requests", data);
  return response.data;
};

export const confirmWithdrawalReceived = async (id) => {
  const response = await apiClient.post(
    `/withdrawal-requests/${id}/confirm-received`
  );
  return response.data;
};

// Cancel withdrawal request
export const cancelWithdrawalRequest = async (id) => {
  const response = await apiClient.put(
    `/withdrawal-requests/${id}/cancel`
  );
  return response.data;
};
