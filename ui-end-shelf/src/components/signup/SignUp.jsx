import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUser } from "../../api/loginapi";
import { toast } from "react-toastify";

const SignUp = () => {
  const [formData, setFormData] = useState({
    user_full_name: "",
    user_dob: "",
    user_gender: "",
    user_phone_number: "",
    user_email: "",
    user_address: "",
    user_city: "",
    user_country: "",
    user_zipcode: "",
    user_password: "",
    confirmPassword: "",
    user_organisation: "",
    user_organisation_type: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    let formErrors = {};
    let valid = true;

    if (!formData.user_email) {
      formErrors.user_email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.user_email)) {
      formErrors.user_email = "Email address is invalid";
      valid = false;
    }

    if (!formData.user_password) {
      formErrors.user_password = "Password is required";
      valid = false;
    } else if (formData.user_password.length < 6) {
      formErrors.user_password = "Password must be at least 6 characters";
      valid = false;
    } else if (!formData.confirmPassword === formData.user_password) {
      formErrors.confirmPassword = "Confirm Password is required";
      valid = false;
    } else if (formData.confirmPassword !== formData.user_password) {
      formErrors.confirmPassword =
        "Confirm Password and Password should be equal";
      valid = false;
    }

    setErrors(formErrors);
    return valid;
  };

  const fetchItems = async () => {
    try {
      const data = await createUser(formData);
      console.log("user->", data);
      setFormData({
        user_full_name: "",
        user_dob: "",
        user_gender: "",
        user_phone_number: "",
        user_email: "",
        user_address: "",
        user_city: "",
        user_country: "",
        user_zipcode: "",
        user_password: "",
        confirmPassword: "",
        user_organisation: "",
        user_organisation_type: "",
      });
      setErrors({});
      toast.success("Account created successfully");
      navigate("/login");
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      fetchItems();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="flex min-h-full flex-col align-items-center justify-center px-6 py-12 lg:px-8 ">
      <div className="shadow-lg md:w-2/5 p-3">
        <div className="sm:mx-auto sm:w-full sm:max-w-md ">
          <h2 className="mt-10 text-center text-3xl font-extrabold leading-9 tracking-tight text-custom-focyell">
            Sign Up
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="user_full_name"
                className="block text-sm font-medium leading-6 text-custom-focyell"
              >
                Full Name
              </label>
              <div className="mt-2">
                <input
                  id="user_full_name"
                  name="user_full_name"
                  type="text"
                  value={formData?.user_full_name || ""}
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md border-gray-300 shadow-sm py-2 px-3 text-gray-900 placeholder-gray-400 focus:ring-custom-orange focus:border-custom-orange sm:text-sm"
                />
                {errors.user_full_name && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors?.user_full_name}
                  </p>
                )}
              </div>
            </div>
            <div>
              <label
                htmlFor="user_dob"
                className="block text-sm font-medium leading-6 text-custom-focyell"
              >
                Date of Birth
              </label>
              <div className="mt-2">
                <input
                  id="user_dob"
                  name="user_dob"
                  type="date"
                  value={formData?.user_dob || ""}
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md border-gray-300 shadow-sm py-2 px-3 text-gray-900 placeholder-gray-400 focus:ring-custom-orange focus:border-custom-orange sm:text-sm"
                />
                {errors.user_dob && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors?.user_dob}
                  </p>
                )}
              </div>
            </div>
            <div>
              <label
                htmlFor="user_gender"
                className="block text-sm font-medium leading-6 text-custom-focyell"
              >
                Gender
              </label>
              <div className="mt-2">
                <select
                  id="user_gender"
                  name="user_gender"
                  value={formData?.user_gender || ""}
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md border-gray-300 shadow-sm py-2 px-3 text-gray-900 placeholder-gray-400 focus:ring-custom-orange focus:border-custom-orange sm:text-sm"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {errors.user_gender && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors?.user_gender}
                  </p>
                )}
              </div>
            </div>
            <div>
              <label
                htmlFor="user_phone_number"
                className="block text-sm font-medium leading-6 text-custom-focyell"
              >
                Phone Number
              </label>
              <div className="mt-2">
                <input
                  id="user_phone_number"
                  name="user_phone_number"
                  type="tel"
                  value={formData?.user_phone_number || ""}
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md border-gray-300 shadow-sm py-2 px-3 text-gray-900 placeholder-gray-400 focus:ring-custom-orange focus:border-custom-orange sm:text-sm"
                />
                {errors.user_phone_number && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors?.user_phone_number}
                  </p>
                )}
              </div>
            </div>
            <div>
              <label
                htmlFor="user_email"
                className="block text-sm font-medium leading-6 text-custom-focyell"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="user_email"
                  name="user_email"
                  type="email"
                  autoComplete="email"
                  value={formData?.user_email || ""}
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md border-gray-300 shadow-sm py-2 px-3 text-gray-900 placeholder-gray-400 focus:ring-custom-orange focus:border-custom-orange sm:text-sm"
                />
                {errors.user_email && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors?.user_email}
                  </p>
                )}
              </div>
            </div>
            <div>
              <label
                htmlFor="user_address"
                className="block text-sm font-medium leading-6 text-custom-focyell"
              >
                Address
              </label>
              <div className="mt-2">
                <input
                  id="user_address"
                  name="user_address"
                  type="text"
                  value={formData?.user_address || ""}
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md border-gray-300 shadow-sm py-2 px-3 text-gray-900 placeholder-gray-400 focus:ring-custom-orange focus:border-custom-orange sm:text-sm"
                />
                {errors.user_address && (
                  <p className="mt-2 text-sm text-red-600">
                    error
                  </p>
                )}
              </div>
            </div>
            <div>
              <label
                htmlFor="user_city"
                className="block text-sm font-medium leading-6 text-custom-focyell"
              >
                City
              </label>
              <div className="mt-2">
                <input
                  id="user_city"
                  name="user_city"
                  type="text"
                  value={formData?.user_city || ""}
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md border-gray-300 shadow-sm py-2 px-3 text-gray-900 placeholder-gray-400 focus:ring-custom-orange focus:border-custom-orange sm:text-sm"
                />
                {errors.user_city && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors?.user_city}
                  </p>
                )}
              </div>
            </div>
            <div>
              <label
                htmlFor="user_country"
                className="block text-sm font-medium leading-6 text-custom-focyell"
              >
                Country
              </label>
              <div className="mt-2">
                <input
                  id="user_country"
                  name="user_country"
                  type="text"
                  value={formData?.user_country || ""}
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md border-gray-300 shadow-sm py-2 px-3 text-gray-900 placeholder-gray-400 focus:ring-custom-orange focus:border-custom-orange sm:text-sm"
                />
                {errors.user_country && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors?.user_country}
                  </p>
                )}
              </div>
            </div>
            <div>
              <label
                htmlFor="user_zipcode"
                className="block text-sm font-medium leading-6 text-custom-focyell"
              >
                Zipcode
              </label>
              <div className="mt-2">
                <input
                  id="user_zipcode"
                  name="user_zipcode"
                  type="text"
                  value={formData?.user_zipcode || ""}
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md border-gray-300 shadow-sm py-2 px-3 text-gray-900 placeholder-gray-400 focus:ring-custom-orange focus:border-custom-orange sm:text-sm"
                />
                {errors.user_zipcode && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors?.user_zipcode}
                  </p>
                )}
              </div>
            </div>
            <div>
              <label
                htmlFor="user_organisation"
                className="block text-sm font-medium leading-6 text-custom-focyell"
              >
                Organisation
              </label>
              <div className="mt-2">
                <input
                  id="user_organisation"
                  name="user_organisation"
                  type="text"
                  value={formData?.user_organisation || ""}
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md border-gray-300 shadow-sm py-2 px-3 text-gray-900 placeholder-gray-400 focus:ring-custom-orange focus:border-custom-orange sm:text-sm"
                />
                {errors.user_organisation && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors?.user_organisation}
                  </p>
                )}
              </div>
            </div>
            <div>
              <label
                htmlFor="user_organisation_type"
                className="block text-sm font-medium leading-6 text-custom-focyell"
              >
                Organisation Type
              </label>
              <div className="mt-2">
                <select
                  id="user_organisation_type"
                  name="user_organisation_type"
                  value={formData?.user_organisation_type || ""}
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md border-gray-300 shadow-sm py-2 px-3 text-gray-900 placeholder-gray-400 focus:ring-custom-orange focus:border-custom-orange sm:text-sm"
                >
                  <option value="">Select Organisation Type</option>
                  <option value="Self-Individual">Self-Individual</option>
                  <option value="Non-Profit Organizations">
                    Non-Profit Organizations
                  </option>
                  <option value="Charities">Charities</option>
                  <option value="Trusts">Trusts</option>
                  <option value="Educational Institutions">
                    Educational Institutions
                  </option>
                  <option value="Religious Organizations">
                    Religious Organizations
                  </option>
                  <option value="Healthcare Organizations">
                    Healthcare Organizations
                  </option>
                  <option value="Government Agencies">
                    Government Agencies
                  </option>
                  <option value="Cooperatives">Cooperatives</option>
                  <option value="Small and Medium Enterprises (SMEs)">
                    Small and Medium Enterprises (SMEs)
                  </option>
                  <option value="Community Organizations">
                    Community Organizations
                  </option>
                  <option value="Foundations">Foundations</option>
                  <option value="Social Enterprises">Social Enterprises</option>
                  <option value="Other">Other</option>
                </select>
                {errors.user_organisation_type && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors?.user_organisation_type}
                  </p>
                )}
              </div>
            </div>
            <div>
              <label
                htmlFor="user_password"
                className="block text-sm font-medium leading-6 text-custom-focyell"
              >
                Password
              </label>
              <div className="mt-2">
                <input
                  id="user_password"
                  name="user_password"
                  type="password"
                  value={formData?.user_password || ""}
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md border-gray-300 shadow-sm py-2 px-3 text-gray-900 placeholder-gray-400 focus:ring-custom-orange focus:border-custom-orange sm:text-sm"
                />
                {errors.user_password && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors?.user_password}
                  </p>
                )}
              </div>
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium leading-6 text-custom-focyell"
              >
                Confirm Password
              </label>
              <div className="mt-2">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData?.confirmPassword || ""}
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md border-gray-300 shadow-sm py-2 px-3 text-gray-900 placeholder-gray-400 focus:ring-custom-orange focus:border-custom-orange sm:text-sm"
                />
                {errors?.confirmPassword && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md button-wrapper px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-custom-focyell focus:ring-2 focus:ring-offset-2 focus:ring-custom-orange"
              >
                Sign Up
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-custom-focyell">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold leading-6 text-custom-focyell hover:text-yellow-500"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
