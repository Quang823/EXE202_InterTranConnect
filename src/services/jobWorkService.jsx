import {
  submitJobWork,
  startJobWork,
  confirmJobCompletion,
} from "../apiHandler/jobWorkAPIHandler";
import { uploadToCloudinaryService } from "../services/uploadToCloudinaryService";

export const processJobWorkWithFile = async (jobId, interpreterId, file) => {
  try {
    const resultFileUrl = await uploadToCloudinaryService(file);
    if (!resultFileUrl) {
      throw new Error("Cannot upload file to Cloudinary");
    }

    const result = await submitJobWork(jobId, interpreterId, resultFileUrl);
    return result;
  } catch (error) {
    console.error("Error in processJobWorkWithFile:", error);
    throw error;
  }
};

export const startJobWorkService = async (jobId, interpreterId) => {
  try {
    const result = await startJobWork(jobId, interpreterId);
    return result;
  } catch (error) {
    console.error("Error in startJobWorkService:", error);
    throw error;
  }
};

export const confirmJobCompletionService = async (jobId, customerId) => {
  try {
    const result = await confirmJobCompletion(jobId, customerId);
    return result;
  } catch (error) {
    console.error("Error in confirmJobCompletionService:", error);
    throw error;
  }
};
