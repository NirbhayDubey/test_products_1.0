import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./component/navbar/Navbar";
import PrivateLayout from "./layout/PrivateLayout";
import PublicRoute from "./layout/PublicRoute";
import EditProduct from "./pages/edit-product/EditProduct";
import Login from "./pages/login/Login";
import Logout from "./pages/logout/Logout";
import Products from "./pages/product/Products";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<Login />} />
          </Route>
          <Route element={<PrivateLayout />}>
            <Route path="/product" element={<Products />} />
            <Route path="/edit-product" element={<EditProduct />} />
            <Route path="/logout" element={<Logout />} />
          </Route>
          <Route path="/*" element={<Navigate to={"/login"} />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer position="bottom-left" autoClose={3000} />
    </div>
  );
}

export default App;
