import { apiFetch } from "../api";

export const fetchProduct = async (params: {
  page?: number;
  perPage?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: string;
  category?: string;
  status?: string;
  minPrice?: string;
  maxPrice?: string;
  minStock?: string;
  maxStock?: string;
}) => {
  try {
    // Convert params to URLSearchParams
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        queryParams.append(key, value.toString());
      }
    });

    const response = await apiFetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/admin/products?${queryParams}`,
      {
        credentials: "include",
      }
    );

    return {
      success: true,
      data: response.data,
      message: response.message,
    };
  } catch (error: any) {
    console.error("Fetch products error:", error);
    return {
      success: false,
      data: [],
      message: error.message || "Failed to fetch products",
    };
  }
};

export const createProduct = async (formData: FormData) => {
  try {
    const response = await apiFetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/admin/products`,
      {
        method: "POST",
        body: formData,
      }
    );

    return {
      success: true,
      data: response.data,
      message: response.message,
    };
  } catch (error: any) {
    console.error("Create product error:", error);
    return {
      success: false,
      message: error.message || "Failed to create product",
    };
  }
};

export const updateProduct = async (productId: string, formData: FormData) => {
  try {
    const response = await apiFetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/admin/products/${productId}`,
      {
        method: 'PUT',
        body: formData,
        credentials: 'include',
      }
    );

    return {
      success: true,
      data: response.data,
      message: response.message,
    };
  } catch (error: any) {
    console.error('Update product error:', error);
    return {
      success: false,
      message: error.message || 'Failed to update product',
    };
  }
};

export const deleteProduct = async (productId: string) => {
  try {
    const response = await apiFetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/admin/products/${productId}`,
      {
        method: 'DELETE',
        credentials: 'include',
      }
    );

    return {
      success: true,
      message: response.message,
    };
  } catch (error: any) {
    console.error('Delete product error:', error);
    return {
      success: false,
      message: error.message || 'Failed to delete product',
    };
  }
};


export const toggleProductStatus = async (productId: string, status: string) => {
  try {
    const response = await apiFetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/admin/products/${productId}/status`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
        credentials: 'include',
      }
    );

    return {
      success: true,
      data: response.data,
      message: response.message,
    };
  } catch (error: any) {
    console.error('Toggle product status error:', error);
    return {
      success: false,
      message: error.message || 'Failed to update product status',
    };
  }
};