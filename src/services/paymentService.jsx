import {
  createPayment,
  createDeposit,
  getPaymentInfobyOrdercode,
  payInterpreter,
} from "../apiHandler/paymentAPIHandler";

const handleError = (error, message) => {
  console.error(`${message}:`, error.response?.data || error.message);
  return { success: false, message: error.response?.data?.message || message };
};

export const createPaymentDetail = async (paymentData) => {
  try {
    if (!paymentData.orderId || !paymentData.price) {
      throw new Error("Thiếu thông tin đơn hàng hoặc số tiền!");
    }

    const formattedPaymentData = {
      orderId: String(paymentData.orderId),
      price: Number(paymentData.price),
    };

    const newPayment = await createPayment(formattedPaymentData);
    return {
      success: true,
      data: {
        ...newPayment,
        createdDateFormatted: new Date(newPayment.createdDate).toLocaleString(),
      },
    };
  } catch (error) {
    return handleError(error, "Lỗi khi tạo thanh toán");
  }
};

export const createDepositDetail = async (depositData) => {
  try {
    if (!depositData.accountId || !depositData.price) {
      throw new Error("Thiếu thông tin đơn hàng hoặc số tiền!");
    }

    const formattedPaymentData = {
      accountId: String(depositData.accountId),
      price: Number(depositData.price),
    };

    const newDeposit = await createDeposit(formattedPaymentData);
    return {
      success: true,
      data: {
        ...newDeposit,
        createdDateFormatted: new Date(newDeposit.createdDate).toLocaleString(),
      },
    };
  } catch (error) {
    return handleError(error, "Lỗi khi tạo thanh toán");
  }
};

export const getPaymentInfobyOrderCode = async (orderCode) => {
  try {
    const data = await getPaymentInfobyOrdercode(orderCode);
    return data;
  } catch (error) {
    return handleError(error, "Get PaymentInfo failed");
  }
};

export const payInterpreterDetail = async (paymentData) => {
  try {
    if (!paymentData.jobId || !paymentData.customerId || !paymentData.amount) {
      throw new Error("Thiếu jobId, customerId hoặc số tiền!");
    }

    const formattedPaymentData = {
      jobId: String(paymentData.jobId),
      customerId: String(paymentData.customerId),
      amount: Number(paymentData.amount),
    };

    const paymentResult = await payInterpreter(formattedPaymentData);
    return {
      success: true,
      data: {
        ...paymentResult,
        createdDateFormatted: new Date(
          paymentResult.createdDate
        ).toLocaleString(),
      },
    };
  } catch (error) {
    return handleError(error, "Lỗi khi thanh toán cho phiên dịch viên");
  }
};
