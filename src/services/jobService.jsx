import { postJob } from "../apiHandler/jobAPIHandler";
import { uploadToCloudinaryService } from "../services/uploadToCloudinaryService";

export const createJob = async (jobData) => {
  try {
    if (!jobData.Title || !jobData.ContactEmail) {
      throw new Error("Title and ContactEmail are required");
    }

    let uploadFileUrl = jobData.UploadFile;
    if (jobData.UploadFile && typeof jobData.UploadFile !== "string") {
      uploadFileUrl = await uploadToCloudinaryService(jobData.UploadFile);
      if (!uploadFileUrl) {
        throw new Error(
          "Failed to upload file to Cloudinary. Please try again."
        );
      }
    }

    let companyLogoUrl = jobData.CompanyLogo;
    if (jobData.CompanyLogo && typeof jobData.CompanyLogo !== "string") {
      companyLogoUrl = await uploadToCloudinaryService(jobData.CompanyLogo);
      if (!companyLogoUrl) {
        throw new Error(
          "Failed to upload company logo to Cloudinary. Please try again."
        );
      }
    }

    const user = JSON.parse(sessionStorage.getItem("user") || "{}");
    const customerId = user.id;

    const formattedJobData = {
      jobTitle: jobData.Title || "",
      translationType: jobData.TranslationType || "",
      sourceLanguage: jobData.SourceLanguage || "",
      targetLanguage: jobData.TranslationLanguage || "",
      description: jobData.Description || "",
      uploadFileUrl: uploadFileUrl || "",
      hourlyRate: parseFloat(jobData.HourlyRate) || 0,
      platformServiceFee: parseFloat(jobData.PlatformServiceFee) || 0,
      totalFee: parseFloat(jobData.TotalFee) || 0,
      companyName: jobData.CompanyName || "",
      companyDescription: jobData.CompanyDescription || "",
      companyLogoUrl: companyLogoUrl || "",
      contactEmail: jobData.ContactEmail || "",
      contactPhone: jobData.ContactPhone || "",
      contactAddress: jobData.ContactAddress || "",
      workAddressLine: jobData.WorkAddressLine || "",
      workCity: jobData.WorkCity || "",
      workPostalCode: jobData.WorkPostalCode || "",
      workCountry: jobData.WorkCountry || "",
      customerId: customerId,
    };
    const response = await postJob(formattedJobData);
    return response;
  } catch (error) {
    console.error("Error in createJob:", error);
    throw new Error(`Failed to create job: ${error.message}`);
  }
};
