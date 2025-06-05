import {
  getWallet,
  depositWallet,
  purchaseWallet,
  getWalletTransactions,
} from "../apiHandler/walletAPIHandler";

export const fetchUserWallet = async (accountId) => {
  try {
    if (!accountId) {
      throw new Error("No userId provided");
    }
    const wallet = await getWallet(accountId);
    return wallet;
  } catch (error) {
    console.error(
      "Error fetching wallet:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const depositMoneyToWallet = async (depositData) => {
  try {
    const accountId = String(depositData.accountId || "").trim();
    const amount = Number(depositData.amount);
    const orderCode = String(depositData.orderCode || "").trim();

    if (!accountId) {
      throw new Error("Account ID is required!");
    }
    if (amount <= 0) {
      throw new Error("Amount must be a valid positive number!");
    }
    if (!orderCode) {
      throw new Error("OrderCode is required!");
    }

    const response = await depositWallet(accountId, amount, orderCode);
    return response;
  } catch (error) {
    console.error(
      "Error depositing to wallet:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const purchaseMoneybyWallet = async (accountId, amount, orderId) => {
  try {
    if (!accountId || !amount || !orderId) {
      throw new Error("Account ID or amount are required!");
    }

    const response = await purchaseWallet(accountId, amount, orderId);
    return response;
  } catch (error) {
    console.error(
      "Error depositing to wallet:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const fetchWalletTransactions = async (
  walletId,
  pageNumber,
  pageSize
) => {
  try {
    if (!walletId) {
      throw new Error("Wallet ID is required!");
    }
    if (isNaN(pageNumber) || pageNumber < 1) {
      throw new Error("Page number must be a positive integer!");
    }
    if (isNaN(pageSize) || pageSize < 1) {
      throw new Error("Page size must be a positive integer!");
    }

    const response = await getWalletTransactions(
      walletId,
      pageNumber,
      pageSize
    );
    return response;
  } catch (error) {
    console.error(
      "Error fetching wallet transactions:",
      error.response?.data || error.message
    );
    throw error;
  }
};
