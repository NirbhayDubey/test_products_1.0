import axios from "axios";
import { LoginCreds, Product } from "../types/common";

const API_BASE_URL = "http://localhost:5000";
const API_LOGIN = "/";
const API_PRODUCTS = "/api/product";

// @Login API
const login = (creds: LoginCreds) => {
  return axios.post(`${API_BASE_URL}${API_LOGIN}`, creds);
};

// @Product GET API
const getProducts = () => {
  return axios.get(`${API_BASE_URL}${API_PRODUCTS}`);
};

// @Product POST API
const addProduct = (product: Product) => {
  return axios.post(`${API_BASE_URL}${API_PRODUCTS}`, product);
};

// @Product PUT API
const updateProduct = (product: Product) => {
  return axios.put(`${API_BASE_URL}${API_PRODUCTS}/${product._id}`, product);
};

// @Product DELETE API
const removeProduct = (product: Product) => {
  return axios.post(`${API_BASE_URL}${API_PRODUCTS}/${product._id}`);
};

export const apiRequest = {
  login,
  getProducts,
  addProduct,
  updateProduct,
  removeProduct,
};
