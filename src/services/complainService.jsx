import {
  getComplaints,
  createComplaint,
  getComplaintMessages,
  sendComplaintMessage,
  getAllComplaints,
  updateComplaintStatus,
  resolveComplaint,
} from "../apiHandler/complainAPIHandler";

export const fetchComplaints = async () => {
  try {
    return await getComplaints();
  } catch (error) {
    console.error("Error fetching complaints:", error);
    throw error;
  }
};

export const createComplaintService = async (data) => {
  try {
    return await createComplaint(data);
  } catch (error) {
    console.error("Error creating complaint:", error);
    throw error;
  }
};

export const fetchComplaintMessages = async (complaintId) => {
  try {
    return await getComplaintMessages(complaintId);
  } catch (error) {
    console.error("Error fetching complaint messages:", error);
    throw error;
  }
};

export const sendComplaintMessageService = async (complaintId, data) => {
  try {
    return await sendComplaintMessage(complaintId, data);
  } catch (error) {
    console.error("Error sending complaint message:", error);
    throw error;
  }
};

export const fetchAllComplaints = async () => {
  try {
    return await getAllComplaints();
  } catch (error) {
    console.error("Error fetching all complaints (admin):", error);
    throw error;
  }
};

export const updateComplaintStatusService = async (id, status) => {
  try {
    return await updateComplaintStatus(id, status);
  } catch (error) {
    console.error("Error updating complaint status (admin):", error);
    throw error;
  }
};

export const resolveComplaintService = async (id, data) => {
  try {
    return await resolveComplaint(id, data);
  } catch (error) {
    console.error("Error resolving complaint (admin):", error);
    throw error;
  }
};
