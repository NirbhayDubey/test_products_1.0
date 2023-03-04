import React, { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { storageRequest } from "../helpers/storageRequests";

const PublicRoute: FC<any> = () => {
  const token = storageRequest.getAuth();

  if (token) return <Navigate to={"/product"} />;
  return (
    <>
      <Outlet />
    </>
  );
};

export default PublicRoute;
