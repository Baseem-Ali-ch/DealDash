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

export const registerUser = async (userData: RegisterUserData): Promise<RegisterResponse> => {
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