import axios from "axios";

const API_URL = "https://depis3.vercel.app";

// Create axios instance with base URL
const api = axios.create({
  baseURL: API_URL,
});

// Products API
export const productsApi = {
  // Get all products
  getAll: async () => {
    try {
      const response = await api.get("/");
      return response.data;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  },

  // Get single product by ID
  getById: async (id) => {
    try {
      const response = await api.get(`/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching product ${id}:`, error);
      throw error;
    }
  },

  // Create new product (with image upload)
  create: async (productData) => {
    try {
      const response = await api.post("/", productData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error creating product:", error);
      throw error;
    }
  },

  // Update product
  update: async (id, productData) => {
    try {
      const response = await api.patch(`/${id}`, productData);
      return response.data;
    } catch (error) {
      console.error(`Error updating product ${id}:`, error);
      throw error;
    }
  },

  // Delete product
  delete: async (id) => {
    try {
      const response = await api.delete(`/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting product ${id}:`, error);
      throw error;
    }
  },
};
