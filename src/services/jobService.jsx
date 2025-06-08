import {
  postJob,
  getJobsByCustomer,
  getJobDetailByJobId,
} from "../apiHandler/jobAPIHandler";
import { uploadToCloudinaryService } from "../services/uploadToCloudinaryService";

export const createJob = async (jobData) => {
  try {
    if (!jobData.jobTitle || !jobData.contactEmail) {
      throw new Error("jobTitle and contactEmail are required");
    }

    let uploadFileUrl = jobData.uploadFileUrl;
    if (jobData.uploadFileUrl && typeof jobData.uploadFileUrl !== "string") {
      uploadFileUrl = await uploadToCloudinaryService(jobData.uploadFileUrl);
      if (!uploadFileUrl) {
        throw new Error(
          "Failed to upload file to Cloudinary. Please try again."
        );
      }
    }

    let companyLogoUrl = jobData.companyLogoUrl;
    if (jobData.companyLogoUrl && typeof jobData.companyLogoUrl !== "string") {
      companyLogoUrl = await uploadToCloudinaryService(jobData.companyLogoUrl);
      console.log("Uploaded company logo URL:", companyLogoUrl);
      if (!companyLogoUrl) {
        throw new Error(
          "Failed to upload company logo to Cloudinary. Please try again."
        );
      }
    }

    const user = JSON.parse(sessionStorage.getItem("user") || "{}");
    const customerId = user.id;

    const formattedJobData = {
      jobTitle: jobData.jobTitle || "",
      translationType: jobData.translationType || "",
      sourceLanguage: jobData.sourceLanguage || "",
      targetLanguage: jobData.targetLanguage || "",
      description: jobData.description || "",
      uploadFileUrl: uploadFileUrl || "",
      hourlyRate: parseFloat(jobData.hourlyRate) || 0,
      platformServiceFee: parseFloat(jobData.platformServiceFee) || 0,
      totalFee: parseFloat(jobData.totalFee) || 0,
      companyName: jobData.companyName || "",
      companyDescription: jobData.companyDescription || "",
      companyLogoUrl: companyLogoUrl || "",
      contactEmail: jobData.contactEmail || "",
      contactPhone: jobData.contactPhone || "",
      contactAddress: jobData.contactAddress || "",
      workAddressLine: jobData.workAddressLine || "",
      workCity: jobData.workCity || "",
      workPostalCode: jobData.workPostalCode || "",
      workCountry: jobData.workCountry || "",
      ...(jobData.translationType === "Written" && {
        deadline: jobData.deadline,
      }),
      ...(jobData.translationType === "Oral" && {
        workingTime: jobData.workingTime,
      }),
      customerId: customerId,
    };

    console.log("Formatted job data sent to API:", formattedJobData);
    const response = await postJob(formattedJobData);
    console.log("API response from postJob:", response);
    return response;
  } catch (error) {
    console.error("Error in createJob:", error.response?.data || error);
    throw new Error(
      `Failed to create job: ${error.response?.data?.message || error.message}`
    );
  }
};
export const getJobsByCustomerService = async (customerId) => {
  try {
    if (!customerId) {
      throw new Error("customerId is required");
    }
    const jobs = await getJobsByCustomer(customerId);
    return jobs;
  } catch (error) {
    console.error("Error in getJobsByCustomerService:", error);
    throw new Error(`Failed to get jobs: ${error.message}`);
  }
};

export const getJobDetailByJobIdService = async (id) => {
  try {
    if (!id) {
      throw new Error("JobId is required");
    }
    const jobDetails = await getJobDetailByJobId(id);
    return jobDetails;
  } catch (error) {
    console.error("Error in getJobDetailByJobIdService:", error);
    throw new Error(`Failed to get jobDetails: ${error.message}`);
  }
};
