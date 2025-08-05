import apiClient from "../services/axiosConfig";

// Get revenue dashboard data
export const getRevenueDashboard = async () => {
  try {
    const response = await apiClient.get("/admin/revenue-dashboard");
    return response.data;
  } catch (error) {
    console.error("Error fetching revenue dashboard data:", error);
    throw error;
  }
};

// Get revenue dashboard data with date range
export const getRevenueDashboardWithDateRange = async (startDate, endDate) => {
  try {
    const params = new URLSearchParams();
    if (startDate) {
      params.append("startDate", startDate.toISOString());
    }
    if (endDate) {
      params.append("endDate", endDate.toISOString());
    }

    const response = await apiClient.get(
      `/admin/revenue-dashboard?${params.toString()}`
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching revenue dashboard data with date range:",
      error
    );
    throw error;
  }
};

// Get subscription dashboard data
export const getSubscriptionDashboard = async (startDate, endDate) => {
  try {
    const params = new URLSearchParams();
    if (startDate) {
      params.append("startDate", startDate.toISOString());
    }
    if (endDate) {
      params.append("endDate", endDate.toISOString());
    }

    const response = await apiClient.get(
      `/admin/subscription-dashboard?${params.toString()}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching subscription dashboard data:", error);
    throw error;
  }
};

// Get pending certificates
export const getPendingCertificates = async () => {
  try {
    const response = await apiClient.get("/admin/pending-certificates");
    return response.data;
  } catch (error) {
    console.error("Error fetching pending certificates:", error);
    throw error;
  }
};

// Get user by ID
export const getUserById = async (userId) => {
  try {
    const response = await apiClient.get(`/admin/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw error;
  }
};

// Approve user
export const approveUser = async (userId) => {
  try {
    const response = await apiClient.post(`/admin/approve-user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error approving user:", error);
    throw error;
  }
};

// Reject user
export const rejectUser = async (userId) => {
  try {
    const response = await apiClient.post(`/admin/reject-user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error rejecting user:", error);
    throw error;
  }
};

// Get withdrawal requests
export const getWithdrawalRequests = async (pageNumber = 1, pageSize = 999) => {
  try {
    const response = await apiClient.get(
      `/withdrawal-requests?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching withdrawal requests:", error);
    throw error;
  }
};

// Update withdrawal request status
export const updateWithdrawalRequestStatus = async (
  requestId,
  status,
  note
) => {
  try {
    const response = await apiClient.put(
      `/withdrawal-requests/${requestId}/status`,
      { status, note }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating withdrawal request status:", error);
    throw error;
  }
};

// Approve certificate
export const approveCertificate = async (certificateId) => {
  try {
    const response = await apiClient.post(
      `/admin/approve-certificate/${certificateId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error approving certificate:", error);
    throw error;
  }
};

// Reject certificate
export const rejectCertificate = async (certificateId, reason = "string") => {
  try {
    const response = await apiClient.post(
      `/admin/reject-certificate/${certificateId}`,
      { reason },
      { headers: { "Content-Type": "application/json-patch+json" } }
    );
    return response.data;
  } catch (error) {
    console.error("Error rejecting certificate:", error);
    throw error;
  }
};

// Get all users
export const getAllUsers = async () => {
  try {
    const response = await apiClient.get("/admin/all-users");
    return response.data;
  } catch (error) {
    console.error("Error fetching all users:", error);
    throw error;
  }
};

// Get user count by role (Customer, Talent)
export const getUserCountByRole = async () => {
  try {
    const response = await apiClient.get("/User/count-by-role");
    return response.data;
  } catch (error) {
    console.error("Error fetching user count by role:", error);
    throw error;
  }
};

export const getAllTalent = async () => {
  try {
    const response = await apiClient.get("/User/all-talents-with-certificates");
    return response.data;
  } catch (error) {
    console.error("Error fetching all talent users:", error);
    throw error;
  }
};

export const getTopRatedTalents = async (count = 3) => {
  try {
    const response = await apiClient.get(
      `/User/top-rated-talents?count=${count}`
    );
    return response;
  } catch (error) {
    console.error("Error fetching top rated talents:", error);
    throw error;
  }
};
