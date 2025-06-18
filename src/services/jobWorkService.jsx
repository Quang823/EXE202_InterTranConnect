import { submitJobWork } from "../apiHandler/jobWorkAPIHandler";
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
