import {
  loginUser,
  registerUser,
  googleLogin as googleLoginAPI,
} from "../apiHandler/authAPIHandler";
import { jwtDecode } from "jwt-decode";

// Helper function to process login response
const processLoginResponse = (response, loginContext) => {
  const { accessToken, refreshToken, user } = response;

  if (!user || !accessToken) {
    throw new Error("Invalid login response: Missing user or access token");
  }

  // Decode JWT to extract role
  const decodedToken = jwtDecode(accessToken);
  const roleClaim =
    "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";
  const role = decodedToken[roleClaim] || "Unknown";

  // Create user object with role
  const userWithRole = { ...user, role };

  // Store data in AuthContext
  loginContext(userWithRole, accessToken, refreshToken);

  return {
    user: {
      id: user?.id,
      email: user?.email,
      role: role,
      userName: user?.fullName,
      phoneNumber: user?.phoneNumber,
      address: user?.address,
      gender: user?.gender,
    },
    token: accessToken,
    refreshToken,
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
    return processLoginResponse(response, loginContext);
  } catch (error) {
    return handleAuthError(error, "Google login failed");
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
