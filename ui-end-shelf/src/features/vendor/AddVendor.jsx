import { useEffect, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { addVendorApi, editVendorApi } from "../../api/loginapi";
import { toast } from "react-toastify";

const initialFormData = {
  vendor_shop_name: "",
  vendor_shop_license_number: "",
  vendor_shop_email: "",
  vendor_shop_phone_number: "",
  vendor_shop_address: "",
  vendor_shop_city: "",
  vendor_shop_country: "",
  vendor_shop_zipcode: "",
  vendor_delivery: "",
};

const initialFormErrors = {
  vendor_shop_name: "",
  vendor_shop_license_number: "",
  vendor_shop_email: "",
  vendor_shop_phone_number: "",
  vendor_shop_address: "",
  vendor_shop_city: "",
  vendor_shop_country: "",
  vendor_shop_zipcode: "",
  vendor_delivery: "",
};

export default function AddVendorModal({ isOpen, handleModal, handleVendorProducts }) {
  const [formData, setFormData] = useState(initialFormData);
  const [formErrors, setFormErrors] = useState(initialFormErrors);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormErrors({ ...formErrors, [name]: "" }); // Clear error message when user starts typing
  };

  const addVendor = async (formDataToSend) => {
    try {
      const user_id_stored = localStorage.getItem("user_id");
      formDataToSend.user_id = user_id_stored;
      console.log(formDataToSend);
      const data = await addVendorApi(formDataToSend);
      localStorage.setItem("vendor_id", data.vendor_id);
      toast.success("Vendor added successfully");
      setFormData(initialFormData);
      setFormErrors(initialFormErrors);
      handleVendorProducts();
      handleModal();
      console.log("vendor->", data);
    } catch (error) {
      console.error("Error adding vendor:", error);
    }
  };

  const editVendor = async (formDataToSend, id) => {
    try {
      const data = await editVendorApi(formDataToSend, id);
      toast.success("Vendor updated successfully");
      setFormData(initialFormData);
      setFormErrors(initialFormErrors);
      handleVendorProducts();
      handleModal();
      console.log("vendor->", data);
    } catch (error) {
      console.error("Error updating vendor:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform validation
    let errors = {};
    let isValid = true;

    // Basic validation example (you can customize based on your requirements)
    if (!formData?.vendor_shop_name?.trim()) {
      errors.vendor_shop_name = "Vendor shop name is required";
      isValid = false;
    }

    if (!formData?.vendor_shop_license_number?.trim()) {
      errors.vendor_shop_license_number = "Vendor shop license number is required";
      isValid = false;
    }

    if (!formData?.vendor_shop_email?.trim()) {
      errors.vendor_shop_email = "Vendor shop email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.vendor_shop_email)) {
      errors.vendor_shop_email = "Email address is invalid";
      isValid = false;
    }

    if (!formData?.vendor_shop_phone_number?.trim()) {
      errors.vendor_shop_phone_number = "Vendor shop phone number is required";
      isValid = false;
    }

    if (!formData?.vendor_shop_address?.trim()) {
      errors.vendor_shop_address = "Vendor shop address is required";
      isValid = false;
    }

    if (!formData?.vendor_shop_city?.trim()) {
      errors.vendor_shop_city = "Vendor shop city is required";
      isValid = false;
    }

    if (!formData?.vendor_shop_country?.trim()) {
      errors.vendor_shop_country = "Vendor shop country is required";
      isValid = false;
    }

    if (!formData?.vendor_shop_zipcode?.trim()) {
      errors.vendor_shop_zipcode = "Vendor shop zipcode is required";
      isValid = false;
    }

    if (!formData?.vendor_delivery?.trim()) {
      errors.vendor_delivery = "Vendor delivery is required";
      isValid = false;
    }

    if (!isValid) {
      setFormErrors(errors);
      return;
    }

    const formDataToSend = { ...formData };
    if (isOpen.mode === "new") addVendor(formDataToSend);
    else editVendor(formDataToSend, isOpen?.vendor?.id);
  };

  return (
    <Dialog
      className="relative z-10"
      open={!!isOpen?.isOpen}
      onClose={() => {
        setFormData(initialFormData);
        setFormErrors(initialFormErrors);
        handleModal();
      }}
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in md:block"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
          <DialogPanel
            transition
            className="flex w-full transform text-left text-base transition data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in md:my-8 md:max-w-2xl md:px-4 data-[closed]:md:translate-y-0 data-[closed]:md:scale-95 lg:max-w-4xl"
          >
            <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
              <button
                type="button"
                className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
                onClick={() => handleModal(false)}
              >
                <span className="sr-only">Close</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>

              <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
                <div className="sm:col-span-8 lg:col-span-7">
                  <div className="flex justify-center items-center min-h-screen bg-gray-100">
                    <form
                      onSubmit={handleSubmit}
                      className="bg-white p-8 pt-0 rounded-lg  w-full max-w-lg"
                    >
                      <h2 className="text-2xl font-bold mb-6">
                        {isOpen?.mode === "new" ? "Add Vendor" : "Edit Vendor"}
                      </h2>

                      <div className="mb-4">
                        <label
                          htmlFor="vendor_shop_name"
                          className="block text-gray-700 font-medium mb-2"
                        >
                          Vendor Shop Name
                        </label>
                        <input
                          type="text"
                          id="vendor_shop_name"
                          name="vendor_shop_name"
                          value={formData?.vendor_shop_name || ""}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                          required
                        />
                        {formErrors?.vendor_shop_name && (
                          <p className="text-red-500 text-sm mt-1">
                            {formErrors.vendor_shop_name}
                          </p>
                        )}
                      </div>

                      <div className="mb-4">
                        <label
                          htmlFor="vendor_shop_license_number"
                          className="block text-gray-700 font-medium mb-2"
                        >
                          Vendor Shop License Number
                        </label>
                        <input
                          type="text"
                          id="vendor_shop_license_number"
                          name="vendor_shop_license_number"
                          value={formData?.vendor_shop_license_number || ""}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                          required
                        />
                        {formErrors?.vendor_shop_license_number && (
                          <p className="text-red-500 text-sm mt-1">
                            {formErrors.vendor_shop_license_number}
                          </p>
                        )}
                      </div>

                      <div className="mb-4">
                        <label
                          htmlFor="vendor_shop_email"
                          className="block text-gray-700 font-medium mb-2"
                        >
                          Vendor Shop Email
                        </label>
                        <input
                          type="email"
                          id="vendor_shop_email"
                          name="vendor_shop_email"
                          value={formData?.vendor_shop_email || ""}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                          required
                        />
                        {formErrors?.vendor_shop_email && (
                          <p className="text-red-500 text-sm mt-1">
                            {formErrors.vendor_shop_email}
                          </p>
                        )}
                      </div>

                      <div className="mb-4">
                        <label
                          htmlFor="vendor_shop_phone_number"
                          className="block text-gray-700 font-medium mb-2"
                        >
                          Vendor Shop Phone Number
                        </label>
                        <input
                          type="text"
                          id="vendor_shop_phone_number"
                          name="vendor_shop_phone_number"
                          value={formData?.vendor_shop_phone_number || ""}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                          required
                        />
                        {formErrors?.vendor_shop_phone_number && (
                          <p className="text-red-500 text-sm mt-1">
                            {formErrors.vendor_shop_phone_number}
                          </p>
                        )}
                      </div>

                      <div className="mb-4">
                        <label
                          htmlFor="vendor_shop_address"
                          className="block text-gray-700 font-medium mb-2"
                        >
                          Vendor Shop Address
                        </label>
                        <input
                          type="text"
                          id="vendor_shop_address"
                          name="vendor_shop_address"
                          value={formData?.vendor_shop_address || ""}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                          required
                        />
                        {formErrors?.vendor_shop_address && (
                          <p className="text-red-500 text-sm mt-1">
                            {formErrors.vendor_shop_address}
                          </p>
                        )}
                      </div>

                      <div className="mb-4">
                        <label
                          htmlFor="vendor_shop_city"
                          className="block text-gray-700 font-medium mb-2"
                        >
                          Vendor Shop City
                        </label>
                        <input
                          type="text"
                          id="vendor_shop_city"
                          name="vendor_shop_city"
                          value={formData?.vendor_shop_city || ""}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                          required
                        />
                        {formErrors?.vendor_shop_city && (
                          <p className="text-red-500 text-sm mt-1">
                            {formErrors.vendor_shop_city}
                          </p>
                        )}
                      </div>

                      <div className="mb-4">
                        <label
                          htmlFor="vendor_shop_country"
                          className="block text-gray-700 font-medium mb-2"
                        >
                          Vendor Shop Country
                        </label>
                        <input
                          type="text"
                          id="vendor_shop_country"
                          name="vendor_shop_country"
                          value={formData?.vendor_shop_country || ""}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                          required
                        />
                        {formErrors?.vendor_shop_country && (
                          <p className="text-red-500 text-sm mt-1">
                            {formErrors.vendor_shop_country}
                          </p>
                        )}
                      </div>

                      <div className="mb-4">
                        <label
                          htmlFor="vendor_shop_zipcode"
                          className="block text-gray-700 font-medium mb-2"
                        >
                          Vendor Shop Zipcode
                        </label>
                        <input
                          type="text"
                          id="vendor_shop_zipcode"
                          name="vendor_shop_zipcode"
                          value={formData?.vendor_shop_zipcode || ""}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                          required
                        />
                        {formErrors?.vendor_shop_zipcode && (
                          <p className="text-red-500 text-sm mt-1">
                            {formErrors.vendor_shop_zipcode}
                          </p>
                        )}
                      </div>

                      <div className="mb-4">
                        <label
                          htmlFor="vendor_delivery"
                          className="block text-gray-700 font-medium mb-2"
                        >
                          Vendor Delivery
                        </label>
                        <select
                          id="vendor_delivery"
                          name="vendor_delivery"
                          value={formData?.vendor_delivery || ""}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                          required
                        >
                          <option value="">Select</option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </select>
                        {formErrors?.vendor_delivery && (
                          <p className="text-red-500 text-sm mt-1">
                            {formErrors.vendor_delivery}
                          </p>
                        )}
                      </div>

                      <button
                        type="submit"
                        className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        {isOpen?.mode === "new" ? "Add Vendor" : "Edit Vendor"}
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
