import { axiosInstance } from "../plugins/axiosSetup";
import { LoginCreds, Product } from "../types/common";

const API_LOGIN = "/";
const API_PRODUCTS = "/api/product";

// @Login API
const login = (creds: LoginCreds) => {
  return axiosInstance.post(`${API_LOGIN}`, creds);
};

// @Product GET API
const getProducts = () => {
  return axiosInstance.get(`${API_PRODUCTS}`);
};

// @Product POST API
const addProduct = (product: any) => {
  return axiosInstance.post(`${API_PRODUCTS}`, product);
};

// @Product PUT API
const updateProduct = (product: Product) => {
  return axiosInstance.put(`${API_PRODUCTS}/${product._id}`, product);
};

// @Product DELETE API
const removeProduct = (product: Product) => {
  return axiosInstance.delete(`${API_PRODUCTS}/${product._id}`);
};

export const apiRequest = {
  login,
  getProducts,
  addProduct,
  updateProduct,
  removeProduct,
};
