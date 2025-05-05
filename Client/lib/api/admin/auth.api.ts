import { apiFetch } from "../api";

export const login = async (
  email: string,
  password: string
): Promise<{ success: boolean; message?: string }> => {
  try {
    const response = await apiFetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/admin/login`,
      {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return {
      success: true,
      message: response.message,
    };
  } catch (error: any) {
    console.error("Login API error:", error);
    return {
      success: false,
      message: error.message,
    };
  }
};
