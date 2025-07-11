// authService.js
import {
  loginUser,
  registerUser,
  googleLogin as googleLoginAPI,
  getUserByUserId,
  assignRole as assignRoleAPI,
  updateUserProfile,
  refreshToken as refreshTokenAPI,
  updateBankAccount,
} from "../apiHandler/authAPIHandler";
import { jwtDecode } from "jwt-decode";

// Helper function to process normal login response
const processLoginResponse = (response, loginContext) => {
  const user = {
    id: response.user.id,
    fullName: response.user.fullName,
    email: response.user.email,
  };

  const accessToken = response.accessToken;
  const refreshToken = response.refreshToken;
  const priority = response.priority;
  if (!user || !accessToken) {
    throw new Error("Invalid login response: Missing user or access token");
  }

  const decodedToken = jwtDecode(accessToken);
  const roleClaim =
    "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";
  const role = decodedToken[roleClaim] || "Unknown";

  const userWithRole = { ...user, role };

  loginContext(userWithRole, accessToken, refreshToken, priority);

  return {
    user: {
      id: user.id,
      email: user.email,
      role: role,
      userName: user.fullName,
    },
    token: accessToken,
    refreshToken,
    priority: priority,
  };
};

// New helper function to process Google login response
const processGoogleLoginResponse = (response, loginContext) => {
  if (!response || !response.accessToken) {
    throw new Error("Invalid Google login response: Missing required fields");
  }

  const user = {
    id: response.user.id,
    fullName: response.user.fullName,
    email: response.user.email,
  };

  const accessToken = response.accessToken;
  const refreshToken = response.refreshToken;
  const priority = response.priority;

  const decodedToken = jwtDecode(accessToken);
  const roleClaim =
    "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";
  const role = decodedToken[roleClaim] || "Unknown";

  const userWithRole = { ...user, role };

  loginContext(userWithRole, accessToken, refreshToken, priority);

  return {
    user: {
      id: user.id,
      email: user.email,
      role: role,
      userName: user.fullName,
    },
    token: accessToken,
    refreshToken,
    priority: priority,
  };
};

const handleAuthError = (error, defaultMessage) => {
  if (error.response) {
    const { status, data } = error.response;
    if (status === 400) {
      throw new Error(data.message || "Invalid data provided");
    } else if (status === 401) {
      throw new Error("Unauthorized: Invalid credentials");
    }
    throw new Error(data.message || defaultMessage);
  }
  throw new Error(error.message || "Network error");
};

export const login = async (email, password, loginContext) => {
  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  try {
    const response = await loginUser(email, password);
    return processLoginResponse(response, loginContext);
  } catch (error) {
    return handleAuthError(error, "Login failed");
  }
};

export const googleLogin = async (credential, loginContext) => {
  try {
    const response = await googleLoginAPI(credential);
    return processGoogleLoginResponse(response, loginContext);
  } catch (error) {
    return handleAuthError(error, "Google login failed");
  }
};

export const assignRole = async (email, role, loginContext) => {
  try {
    const response = await assignRoleAPI(email, role);
    return processLoginResponse(response, loginContext);
  } catch (error) {
    throw new Error(error.message || "Failed to assign role");
  }
};

export const register = async (userData) => {
  const requiredFields = [
    "userName",
    "email",
    "password",
    "confirmPassword",
    "phoneNumber",
    "gender",
    "address",
    "role",
  ];
  const missingFields = requiredFields.filter((field) => !userData[field]);

  if (missingFields.length > 0) {
    throw new Error(`Missing required fields: ${missingFields.join(", ")}`);
  }

  if (userData.password !== userData.confirmPassword) {
    throw new Error("Passwords do not match");
  }

  try {
    const response = await registerUser(userData);

    if (!response.success) {
      throw new Error(response.message || "Registration failed");
    }

    return {
      success: true,
      message: response.message || "Registration successful",
    };
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;
      if (status === 400) {
        throw new Error(data.message || "Invalid data provided");
      } else if (status === 409) {
        throw new Error(data.message || "Email already exists");
      } else if (status === 401) {
        throw new Error("Unauthorized: Admin access required");
      }
      throw new Error(data.message || "Registration failed");
    }
    throw new Error(error.message || "Network error");
  }
};

export const getUserInfoByUserIdService = async (id) => {
  try {
    const response = await getUserByUserId(id);
    return response;
  } catch (error) {
    throw handleAuthError(error, "Fail to get UserInfo");
  }
};

export const updateUserProfileService = async (profileData) => {
  try {
    const response = await updateUserProfile(profileData);
    return response;
  } catch (error) {
    throw handleAuthError(error, "Failed to update profile");
  }
};

export const updateBankAccountService = async (bankAccountData) => {
  const requiredFields = [
    "bankAccountNumber",
    "bankName",
    "bankAccountHolderName",
  ];
  const missingFields = requiredFields.filter(
    (field) => !bankAccountData[field]
  );

  if (missingFields.length > 0) {
    throw new Error(`Missing required fields: ${missingFields.join(", ")}`);
  }

  try {
    const response = await updateBankAccount(bankAccountData);
    return {
      success: true,
      message: response.message || "Bank account updated successfully",
      data: response.data,
    };
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;
      if (status === 400) {
        throw new Error(data.message || "Invalid bank account data");
      } else if (status === 401) {
        throw new Error("Unauthorized: Invalid credentials");
      }
      throw new Error(data.message || "Failed to update bank account");
    }
    throw new Error(error.message || "Network error");
  }
};

// New function to refresh the access token
export const refreshAccessToken = async (loginContext) => {
  const refreshToken = sessionStorage.getItem("refreshToken");
  if (!refreshToken) {
    throw new Error("No refresh token available");
  }

  try {
    const response = await refreshTokenAPI(refreshToken);
    const { accessToken, refreshToken: newRefreshToken } = response;

    if (!accessToken) {
      throw new Error("Failed to refresh token: No access token returned");
    }

    // Update tokens in sessionStorage
    sessionStorage.setItem("accessToken", accessToken);
    if (newRefreshToken) {
      sessionStorage.setItem("refreshToken", newRefreshToken);
    }

    // Decode the new access token to get user info and role
    const decodedToken = jwtDecode(accessToken);
    const roleClaim =
      "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";
    const role = decodedToken[roleClaim] || "Unknown";
    const user = {
      id: decodedToken.sub || decodedToken.id, // Adjust based on your JWT payload
      email: decodedToken.email,
      fullName: decodedToken.fullName || decodedToken.name, // Adjust based on your JWT payload
      role,
    };

    // Update the login context with the new user info and token
    loginContext(user, accessToken, newRefreshToken || refreshToken);

    return {
      user,
      token: accessToken,
      refreshToken: newRefreshToken || refreshToken,
    };
  } catch (error) {
    throw handleAuthError(error, "Token refresh failed");
  }
};
