import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiRequest } from "../helpers/apiRequests";
import { storageRequest } from "../helpers/storageRequests";
import { LoginCreds } from "../types/common";

type Profile = {
  _id: string;
  name: string;
  price: number;
  description: string;
  quantity: number;
  image: string;
};

interface InitialState {
  profile: Profile | undefined;
}

const initialState: InitialState = {
  profile: undefined,
};

const fetchLogin = createAsyncThunk(
  "user/fetchLogin",
  async (creds: LoginCreds, thunkAPI) => {
    try {
      const { data } = await apiRequest.login(creds);
      if (!data.status) throw data.message;
      storageRequest.setAuth(data.data.token);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const fetchLogout = createAsyncThunk("user/fetchLogin", async (_, thunkAPI) => {
  try {
    storageRequest.removeAuth();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

const ProfileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchLogin.fulfilled, (state, action) => {});
    builder.addCase(fetchLogin.rejected, (state, action) => {
      console.log(action.payload);
    });
  },
});

export const {} = ProfileSlice.reducer;
export default ProfileSlice.reducer;
export { fetchLogin, fetchLogout };
