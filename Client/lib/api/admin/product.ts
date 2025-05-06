import { apiFetch } from "../api";

export const createProduct = async (formData: any) => {
  try {
    const response = await apiFetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/admin/products`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include',
      }
    );

    return {
      success: true,
      data: response.data,
      message: response.message,
    };
  } catch (error: any) {
    console.error('Create product error:', error);
    return {
      success: false,
      message: error.message || 'Failed to create product',
    };
  }
};