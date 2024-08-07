import React, { useState } from "react";
import "./login.scss";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import { postLogin } from "../../api/loginapi";
import { toast } from "react-toastify";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [user_email, setUserEmail] = useState("");
  const [user_password, setUserPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleLogin = async () => {
    try {
      const userData = await postLogin({
        user_email: user_email,
        user_password: user_password,
      });
      login(userData);
      toast.success("Login successfully");

      if (userData.user_role === "admin") {
        navigate("/admin/users-list");
      } else if (userData.vendor_id) {
        navigate("/vendor/home");
      } else {
        navigate("/user/home");
      }
    } catch (error) {
      toast.error(error?.response?.data?.detail);
      console.error("Error fetching user data:", error?.error);
    }
  };

  const validateForm = () => {
    let formErrors = {};
    let valid = true;

    if (!user_email) {
      formErrors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(user_email)) {
      formErrors.email = "Email address is invalid";
      valid = false;
    }

    if (!user_password) {
      formErrors.password = "Password is required";
      valid = false;
    } else if (user_password.length < 6) {
      formErrors.password = "Password must be at least 6 characters";
      valid = false;
    }

    setErrors(formErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("validat->", validateForm());
    if (validateForm()) {
      console.log("Form submitted");
      handleLogin();
    }
  };

  return (
    <div className="flex h-full flex-col align-items-center justify-center px-6 py-12 lg:px-8 bg-custom-yellow login-wrapper">
      <div className="md:w-2/5 shadow-lg p-3">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm align-items-center justify-content-center">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight sign-in-color-wrapper  ">
            Sign In
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="user_email"
                className="block text-sm font-medium leading-6 sign-in-color-wrapper "
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="user_email"
                  name="user_email"
                  type="email"
                  autoComplete="email"
                  value={user_email}
                  onBlur={validateForm}
                  onChange={(e) => setUserEmail(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-custom-orange sm:text-sm sm:leading-6"
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-red-500">{errors.email}</p>
                )}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="user_password"
                  className="block text-sm font-medium leading-6 sign-in-color-wrapper "
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="user_password"
                  name="user_password"
                  type="password"
                  onBlur={validateForm}
                  autoComplete="current-password"
                  value={user_password}
                  onChange={(e) => setUserPassword(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 px-2 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-custom-orange sm:text-sm sm:leading-6"
                />
                {errors.password && (
                  <p className="mt-2 text-sm text-red-500">{errors.password}</p>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md button-wrapper px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:text-yellow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-custom-orange"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-custom-focyell ">
            Do not have an account?
            <Link
              to="/signup"
              className="font-semibold leading-6 ml-1 text-custom-focyell hover:text-yellow-400"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
