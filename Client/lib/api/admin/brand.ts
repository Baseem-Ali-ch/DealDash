import { apiFetch } from "../api";


export const fetchBrands = async () => {
  try {
    const response = await apiFetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/admin/brand`,
      {
        credentials: "include",
      }
    );
    return response;
  } catch (error) {
    console.error("Fetch brands error:", error);
    throw error;
  }
};

export const createBrand = async (formData: any) => {
  try {
    const response = await apiFetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/admin/brand`,
      {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      }
    );

    return {
      success: true,
      data: response.data,
      message: response.message,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const updateBrand = async (brandId: string, formData: any) => {
  try {
    const response = await apiFetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/admin/brand/${brandId}`,
      {
        method: 'PUT',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      }
    );

    return {
      success: true,
      data: response.data,
      message: response.message,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};


export const deleteBrand = async (
  brandId: string
): Promise<{ success: boolean; message?: string }> => {
  try {
    if (!brandId) {
      throw new Error("Brand ID is required for deletion");
    }

    const response = await apiFetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/admin/brand/${brandId}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );

    return {
      success: true,
      message: response.message,
    };
  } catch (error: any) {
    console.error("Delete brand error:", error);
    return {
      success: false,
      message: error.message,
    };
  }
};

// ...existing code...

export const toggleBrandStatus = async (
    brandId: string, 
    status: 'active' | 'inactive'
  ): Promise<{ success: boolean; message?: string; data?: any }> => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/admin/brand/${brandId}/toggle-status`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({ status }),
        }
      );
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || 'Failed to toggle brand status');
      }
  
      return {
        success: true,
        data: data.data,
        message: data.message,
      };
    } catch (error: any) {
      console.error('Toggle brand status error:', error);
      return {
        success: false,
        message: error.message,
      };
    }
  };