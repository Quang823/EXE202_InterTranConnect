import {
  getJobApplication,
  selectTranslatorForJob,
  getJobApplicationById,
} from "../apiHandler/jobApplicationAPIHandler";

export const fetchJobApplications = async (jobId) => {
  try {
    if (!jobId || typeof jobId !== "string") {
      throw new Error("Job ID is required and must be a string!");
    }
    const applications = await getJobApplication(jobId);
    if (!applications || !Array.isArray(applications)) {
      throw new Error(
        "Invalid response format: Expected an array of applications"
      );
    }
    return applications;
  } catch (error) {
    console.error(
      "Service error fetching job applications:",
      error.message || error
    );
    throw new Error(
      error.message ||
        "Failed to fetch job applications. Please try again later."
    );
  }
};

export const selectTranslator = async (jobId, interpreterId) => {
  try {
    if (!jobId || typeof jobId !== "string") {
      throw new Error("Job ID is required and must be a string!");
    }
    if (!interpreterId || typeof interpreterId !== "string") {
      throw new Error("Interpreter ID is required and must be a string!");
    }

    console.log("Calling selectTranslatorForJob with:", {
      jobId,
      interpreterId,
    });
    const response = await selectTranslatorForJob(jobId, interpreterId);
    console.log("Response from selectTranslatorForJob:", response);

    // Kiểm tra response là chuỗi thành công hoặc lỗi
    if (typeof response === "string" && response.includes("successfully")) {
      return { success: true, message: response }; // Chuyển đổi thành object
    } else if (typeof response === "string" && response.includes("failed")) {
      throw new Error(response || "Selection failed due to server response.");
    } else {
      throw new Error("Unexpected server response format.");
    }
  } catch (error) {
    console.error(
      "Service error selecting translator:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Failed to select translator. Please try again later."
    );
  }
};

export const fetchJobApplicationById = async (id) => {
  try {
    if (!id || typeof id !== "string") {
      throw new Error("Application ID is required and must be a string!");
    }
    const application = await getJobApplicationById(id);
    if (!application) {
      throw new Error("Application not found or invalid response.");
    }
    return application;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Failed to fetch job application. Please try again later."
    );
  }
};
