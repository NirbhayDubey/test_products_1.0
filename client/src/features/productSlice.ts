import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { apiRequest } from "../helpers/apiRequests";

type Product = {
  _id: string;
  name: string;
  price: number;
  description: string;
  quantity: number;
  image: string;
};

interface InitialState {
  products: Array<Product>;
}

const initialState: InitialState = {
  products: [],
};

const fetchProducts = createAsyncThunk(
  "user/fetchProducts",
  async (_, thunkAPI) => {
    try {
      const { data } = await apiRequest.getProducts();
      if (!data.status) throw data.message;
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const fetchAddProduct = createAsyncThunk(
  "user/fetchAddProduct",
  async (product: any, thunkAPI) => {
    try {
      const { data } = await apiRequest.addProduct(product);
      if (!data.status) throw data;
      return thunkAPI.fulfillWithValue(data.message);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    } finally {
      await thunkAPI.dispatch(fetchProducts());
    }
  }
);

const fetchUpdateProduct = createAsyncThunk(
  "user/fetchUpdateProduct",
  async (product: Product, thunkAPI) => {
    try {
      const { data } = await apiRequest.updateProduct(product);
      if (!data.status) throw data;
      return thunkAPI.fulfillWithValue(data.message);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    } finally {
      await thunkAPI.dispatch(fetchProducts());
    }
  }
);

const fetchRemoveProduct = createAsyncThunk(
  "user/fetchRemoveProduct",
  async (product: Product, thunkAPI) => {
    try {
      const { data } = await apiRequest.removeProduct(product);
      if (!data.status) throw data;
      return thunkAPI.fulfillWithValue(data.message);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    } finally {
      await thunkAPI.dispatch(fetchProducts());
    }
  }
);

const ProductSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload.products;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        console.log(action.payload);
      })
      .addCase(fetchUpdateProduct.fulfilled, (state, action) => {
        toast.success(action.payload);
      })
      .addCase(fetchUpdateProduct.rejected, (state, action: any) => {
        toast.error(action.payload);
      })
      .addCase(fetchAddProduct.fulfilled, (state, action) => {
        toast.success(action.payload);
      })
      .addCase(fetchAddProduct.rejected, (state, action: any) => {
        toast.error(action.payload);
      })
      .addCase(fetchRemoveProduct.fulfilled, (state, action) => {
        toast.success(action.payload);
      })
      .addCase(fetchRemoveProduct.rejected, (state, action: any) => {
        toast.error(action.payload);
      });
  },
});

export const {} = ProductSlice.reducer;
export default ProductSlice.reducer;
export {
  fetchProducts,
  fetchAddProduct,
  fetchUpdateProduct,
  fetchRemoveProduct,
};
