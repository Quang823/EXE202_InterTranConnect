import {
  getJobApplication,
  selectTranslatorForJob,
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
    const response = await selectTranslatorForJob(jobId, interpreterId);
    return response;
  } catch (error) {
    console.error(
      "Service error selecting translator:",
      error.message || error
    );
    throw new Error(
      error.message || "Failed to select translator. Please try again later."
    );
  }
};
