import {
  getTranslatorCertificates,
  updateTranslatorCertificate,
} from "../apiHandler/translatorAPIHandler";
import { uploadToCloudinaryService } from "../services/uploadToCloudinaryService";

export const fetchTranslatorCertificates = async (userId) => {
  try {
    if (!userId) {
      throw new Error("userId is required");
    }
    const response = await getTranslatorCertificates(userId);
    return response;
  } catch (error) {
    console.error(
      "Error in fetchTranslatorCertificates:",
      error.response?.data || error
    );
    throw new Error(
      `Failed to fetch certificates: ${
        error.response?.data?.message || error.message
      }`
    );
  }
};
export const addTranslatorCertificate = async (certificateData) => {
  try {
    if (!certificateData.title || !certificateData.userId) {
      throw new Error("title and userId are required");
    }

    let certificateFileUrl = certificateData.certificateFileUrl;
    if (
      certificateData.certificateFileUrl &&
      typeof certificateData.certificateFileUrl !== "string"
    ) {
      certificateFileUrl = await uploadToCloudinaryService(
        certificateData.certificateFileUrl
      );
      if (!certificateFileUrl) {
        throw new Error(
          "Failed to upload certificate file to Cloudinary. Please try again."
        );
      }
    }

    let photoUrl = certificateData.photoUrl;
    if (
      certificateData.photoUrl &&
      typeof certificateData.photoUrl !== "string"
    ) {
      photoUrl = await uploadToCloudinaryService(certificateData.photoUrl);
      if (!photoUrl) {
        throw new Error(
          "Failed to upload photo to Cloudinary. Please try again."
        );
      }
    }

    const formattedCertificateData = {
      title: certificateData.title || "",
      experience: parseInt(certificateData.experience) || 0,
      education: certificateData.education || "",
      website: certificateData.website || "",
      cvFileUrl: certificateData.cvFileUrl || "",
      photoUrl: photoUrl || "",
      workType: certificateData.workType || "",
      translationForm: certificateData.translationForm || "",
      translationLanguage: certificateData.translationLanguage || "",
      certificateNames: certificateData.certificateNames || "",
      certificateFileUrl: certificateFileUrl || "",
    };

    const response = await updateTranslatorCertificate(
      certificateData.userId,
      formattedCertificateData
    );

    return response;
  } catch (error) {
    console.error(
      "Error in addTranslatorCertificate:",
      error.response?.data || error
    );
    throw new Error(
      `Failed to add certificate: ${
        error.response?.data?.message || error.message
      }`
    );
  }
};
