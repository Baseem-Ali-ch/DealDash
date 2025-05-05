import { apiFetch } from "../api";

export const fetchCategories = async () => {
  try {
    const response = await apiFetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/admin/category`,
      {
        credentials: "include",
      }
    );
    return response;
  } catch (error) {
    console.error("Fetch categories error:", error);
    throw error;
  }
};

export const createCategory = async (
  formData: any
): Promise<{ success: boolean; message?: string; data?: any }> => {
  try {
    const response = await apiFetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/admin/category`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      }
    );
    return {
      success: true,
      message: response.message,
      data: response.data,
    };
  } catch (error: any) {
    console.error("Category API error:", error);
    return {
      success: false,
      message: error.message,
    };
  }
};

export const updateCategory = async (
  categoryId: string,
  formData: any
): Promise<{ success: boolean; message?: string; data?: any }> => {
  try {
    // Ensure categoryId exists
    if (!categoryId) {
      throw new Error("Category ID is required for updating");
    }
    
    const response = await apiFetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/admin/category/${categoryId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      }
    );
 
    return {
      success: true,
      message: response.message,
      data: response.data,
    };
  } catch (error: any) {
    console.error("Update category error:", error);
    return {
      success: false,
      message: error.message,
    };
  }
};

export const deleteCategory = async (
  categoryId: string
): Promise<{ success: boolean; message?: string }> => {
  try {
    if (!categoryId) {
      throw new Error("Category ID is required for deletion");
    }

    const response = await apiFetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/admin/category/${categoryId}`,
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
    console.error("Delete category error:", error);
    return {
      success: false,
      message: error.message,
    };
  }
};

// ...existing code...

export const toggleCategoryStatus = async (
    categoryId: string, 
    status: 'active' | 'inactive'
  ): Promise<{ success: boolean; message?: string; data?: any }> => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/admin/categories/${categoryId}/toggle-status`,
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
        throw new Error(data.message);
      }
  
      return {
        success: true,
        data: data.data,
        message: data.message,
      };
    } catch (error: any) {
      console.error('Toggle category status error:', error);
      return {
        success: false,
        message: error.message,
      };
    }
  };