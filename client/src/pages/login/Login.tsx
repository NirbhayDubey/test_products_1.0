import React, { FC } from "react";
import { useFormik } from "formik";
import { useAppDispatch } from "../../app/hooks";
import { fetchLogin } from "../../features/profile";
import { LoginCreds } from "../../types/common";
import { useNavigate } from "react-router-dom";

const Login: FC<unknown> = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const initailValues: LoginCreds = {
    email: "",
    password: "",
  };

  const formik = useFormik({
    initialValues: initailValues,
    validationSchema: "",
    onSubmit: async (values, { setStatus, setErrors, setValues }) => {
      try {
        await dispatch(fetchLogin(values));
        navigate("/product");
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <div className="md:h-[90vh] w-full">
      <section className="h-full flex flex-col md:flex-row justify-center items-center">
        <div className="hidden md:flex md:w-2/6 h-full flex flex-col justify-end">
          <img
            src="/assets/images/floating_.svg"
            alt=""
            className="w-1/2 mr-auto mb-10"
          />
          <img
            src="/assets/images/loading_.svg"
            alt=""
            className="w-1/2 ml-auto"
          />
        </div>
        <div className="w-full lg:w-2/6 bg-white h-[500px] shadow-md rounded-3xl py-10 mx-4 mt-10 md:mt-0">
          <header className="flex flex-col items-center justify-center">
            <h1 className="text-2xl font-semibold">User Login</h1>
            <p className="text-[15px] text-center px-10 md:px-20 py-3 opacity-70">
              Hey, Enter your details to get sign in to your account
            </p>
          </header>
          <section className="flex flex-col items-center mt-8 justify-between">
            <form onSubmit={formik.handleSubmit} className="w-3/4">
              <div className="mb-3">
                <input
                  type="text"
                  name="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Enter Email"
                  className="w-full border border-2 rounded-md p-2 px-4 text-sm outline-none"
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  name="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Passcode"
                  className="w-full border border-2 rounded-md p-2 px-4 text-sm outline-none"
                />
              </div>
              <div className="mb-3">
                <span className="text-sm opacity-70">
                  Having trouble in sign in?
                </span>
              </div>
              <div>
                <input
                  type="submit"
                  value="Sign in"
                  className="mt-3 font-semibold w-full p-2.5 text-sm text-[#47301a] text-center bg-[#fdc886] rounded-lg"
                />
              </div>
            </form>
            <div className="mt-20 text-sm opacity-70">
              Don't have an account ?{" "}
              <span className="font-semibold">Sign up</span>
            </div>
          </section>
        </div>
        <div className="w-auto md:w-2/6">
          <img src="/assets/images/welcome_avatar.svg" alt="" />
        </div>
      </section>
    </div>
  );
};

export default Login;
