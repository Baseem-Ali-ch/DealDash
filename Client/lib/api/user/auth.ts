import { apiFetch } from "../api";

interface RegisterUserData {
  fullName: string;
  email: string;
  password: string;
}

interface RegisterResponse {
  success: boolean;
  data?: {
    id: string;
    fullName: string;
    email: string;
    isVerified: boolean;
  };
  message?: string;
  error?: string;
}

export const registerUser = async (
  userData: RegisterUserData
): Promise<RegisterResponse> => {
  try {
    const response = await apiFetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    return response; // The response is already JSON from apiFetch
  } catch (error) {
    console.error("Register API error:", error);
    throw error;
  }
};

export const loginUser = async (userData: {
  email: string;
  password: string;
}) => {
  try {
    const response = await apiFetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    return response;
  } catch (error) {
    console.error("Login API error:", error);
    throw error;
  }
};
