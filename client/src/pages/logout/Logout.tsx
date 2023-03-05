import React, { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { fetchLogout } from "../../features/profileSlice";

const Logout: FC<unknown> = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      await dispatch(fetchLogout());
      navigate("/login");
    })();
  }, []);

  return <></>;
};

export default Logout;
