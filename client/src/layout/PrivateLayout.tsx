import React, { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { storageRequest } from "../helpers/storageRequests";

const PrivateLayout: FC<any> = () => {
  const token = storageRequest.getAuth();

  if (!token) return <Navigate to={"/login"} />;
  return (
    <>
      <Outlet />
    </>
  );
};

export default PrivateLayout;
