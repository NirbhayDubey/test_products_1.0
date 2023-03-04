import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./component/navbar/Navbar";
import PrivateLayout from "./layout/PrivateLayout";
import PublicRoute from "./layout/PublicRoute";
import EditProduct from "./pages/edit-product/EditProduct";
import Login from "./pages/login/Login";
import Products from "./pages/product/Products";

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
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
