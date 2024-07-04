import { useEffect, useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { addItemApi, editItemApi } from "../../api/loginapi";
import { toast } from "react-toastify";
import Loader from "../../components/Loader/Loader";

const initialFormData = {
  item_quantity_available: "",
  item_category: "",
  item_expiry_date: "",
  user_id: "",
  item_available_date: "",
  vendor_id: "",
  item_name: "",
  item_quantity: "",
  item_price: "",
  file: null,
};

const initialFormErrors = {
  item_quantity_available: "",
  item_category: "",
  item_expiry_date: "",
  user_id: "",
  item_available_date: "",
  vendor_id: "",
  item_name: "",
  item_quantity: "",
  item_price: "",
  file: "",
};

export default function AddItem({ isOpen, product, handleModal, handleVendorProducts }) {
  const [formData, setFormData] = useState(initialFormData);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [imagePreview, setImagePreview] = useState("");
  const [loading,setLoading]=useState(false)

  useEffect(() => {
    if (isOpen.mode === "edit" && product) {
      setFormData({
        item_quantity_available: product.item_quantity_available,
        item_category: product.item_category,
        item_expiry_date: product.item_expiry_date,
        user_id: product.user_id,
        item_available_date: product.item_available_date,
        vendor_id: product.vendor_id,
        item_name: product.item_name,
        item_quantity: product.item_quantity,
        item_price: product.item_price,
        file: null,
      });
      setImagePreview(product.item_image_url);
    }
  }, [isOpen, product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormErrors({ ...formErrors, [name]: "" });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, file });
  
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };
  

  const addItem = async (formDataToSend) => {
    try {
      setLoading(true);
      const user_id_stored = localStorage.getItem("user_id");
      const vendor_id_stored = localStorage.getItem("vendor_id");
      formDataToSend.append("user_id", user_id_stored);
      formDataToSend.append("vendor_id", vendor_id_stored);

      const data = await addItemApi(formDataToSend);
      toast.success("Item added successfully");
      setFormData(initialFormData);
      setFormErrors(initialFormErrors);
      setLoading(false);
      handleVendorProducts();
      handleModal();
      console.log("item->", data);
    } catch (error) {
      setLoading(false);
      console.error("Error adding item:", error);
    }
  };

  const editItem = async (formDataToSend, id) => {
    try {
      setLoading(true);
      const data = await editItemApi(formDataToSend, id);
      toast.success("Item updated successfully");
      setFormData(initialFormData);
      setFormErrors(initialFormErrors);
      setLoading(false);
      handleVendorProducts();
      handleModal();
      console.log("item->", data);
    } catch (error) {
      setLoading(false);
      console.error("Error updating item:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform validation
    let errors = {};
    let isValid = true;
  
    // Basic validation example (you can customize based on your requirements)
    if (!formData?.item_name?.trim()) {
      errors.item_name = "Item name is required";
      isValid = false;
    }
  
    if (!formData?.item_quantity_available) {
      errors.item_quantity_available = "Item quantity available is required";
      isValid = false;
    }
  
    if (!formData?.item_category?.trim()) {
      errors.item_category = "Item category is required";
      isValid = false;
    }
  
    if (!formData?.item_expiry_date?.trim()) {
      errors.item_expiry_date = "Item expiry date is required";
      isValid = false;
    }
  
    if (!formData?.item_available_date?.trim()) {
      errors.item_available_date = "Item available date is required";
      isValid = false;
    }
  
    if (!formData?.item_quantity) {
      errors.item_quantity = "Item quantity is required";
      isValid = false;
    }
  
    if (!formData?.item_price) {
      errors.item_price = "Item price is required";
      isValid = false;
    }
  
    if (!formData?.file && isOpen.mode === "new") {
      errors.file = "Item image is required";
      isValid = false;
    }
  
    if (!isValid) {
      setFormErrors(errors);
      return;
    }
  
    const formDataToSend = new FormData();
    formDataToSend.append("item_name", formData.item_name);
    formDataToSend.append("item_quantity_available", formData.item_quantity_available);
    formDataToSend.append("item_category", formData.item_category);
    formDataToSend.append("item_expiry_date", formData.item_expiry_date);
    formDataToSend.append("item_available_date", formData.item_available_date);
    formDataToSend.append("item_quantity", formData.item_quantity);
    formDataToSend.append("item_price", formData.item_price);
    if (formData.file) {
      formDataToSend.append("file", formData.file);
    }
  
    if (isOpen.mode === "new") addItem(formDataToSend);
    else editItem(formDataToSend, product?.item_id);
  };
  

  return (
    <>
      {loading&&<Loader/>}
      <Dialog
        className="relative z-10"
        open={!!isOpen?.isOpen}
        onClose={() => {
          setFormData(initialFormData);
          setFormErrors(initialFormErrors);
          setImagePreview("");
          handleModal();
        }}
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 hidden bg-white bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in md:block"
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
                  onClick={() => {
                    setFormData(initialFormData);
                    setFormErrors(initialFormErrors);
                    setImagePreview("");
                    handleModal();
                  }}
                >
                  <span className="sr-only">Close</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
    
                <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
                  <div className="sm:col-span-8 lg:col-span-7">
                    <div className="flex justify-center items-center min-h-screen bg-white">
                      <form
                        onSubmit={handleSubmit}
                        className="bg-white p-8 pt-0 rounded-lg  w-full max-w-lg"
                      >
                        <h2 className="text-2xl font-bold mb-6">
                          {isOpen?.mode === "new" ? "Add Item" : "Edit Item"}
                        </h2>

                        <div className="mb-4">
                          <label
                            htmlFor="item_category"
                            className="block text-gray-700 font-medium mb-2"
                          >
                            Item Category
                          </label>
                          <select
                            id="item_category"
                            name="item_category"
                            value={formData?.item_category || ""}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            required
                          >
                            <option value="">Select</option>
                            <option value="Plants">Plants</option>
                            <option value="Seeds">Seeds</option>
                            <option value="Fruits">Fruits</option>
                            <option value="Vegetables">Vegetables</option>
                            <option value="Dairy_Products">Dairy Products</option>
                            <option value="Snacks">Snacks</option>
                            <option value="Beverages">Beverages</option>
                            <option value="Bakery_Items">Bakery Items</option>
                            <option value="Cleaning_Products">Cleaning Products</option>
                            <option value="Household_Supplies">Household Supplies</option>
                            <option value="Toiletries">Toiletries</option>
                            <option value="Skincare">Skincare</option>
                            <option value="Haircare">Haircare</option>
                            <option value="Personal Care">Personal Care</option>
                            <option value="Cosmetics">Cosmetics</option>
                            <option value="Health_
                            Supplements">Health Supplements</option>
                          </select>
                          {formErrors?.item_category && (
                            <p className="text-red-500 text-sm mt-1">
                              {formErrors.item_category}
                            </p>
                          )}
                        </div>
    
                        <div className="mb-4">
                          <label
                            htmlFor="item_name"
                            className="block text-gray-700 font-medium mb-2"
                          >
                            Item Name
                          </label>
                          <input
                            type="text"
                            id="item_name"
                            name="item_name"
                            value={formData?.item_name || ""}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            required
                          />
                          {formErrors?.item_name && (
                            <p className="text-red-500 text-sm mt-1">
                              {formErrors.item_name}
                            </p>
                          )}
                        </div>

                        <div className="mb-4">
                          <label
                            htmlFor="item_price"
                            className="block text-gray-700 font-medium mb-2"
                          >
                            Item Price
                          </label>
                          <input
                            type="number"
                            id="item_price"
                            name="item_price"
                            value={formData?.item_price || ""}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            required
                          />
                          {formErrors?.item_price && (
                            <p className="text-red-500 text-sm mt-1">
                              {formErrors.item_price}
                            </p>
                          )}
                        </div>

                        <div className="mb-4">
                          <label
                            htmlFor="item_quantity"
                            className="block text-gray-700 font-medium mb-2"
                          >
                            Item Quantity
                          </label>
                          <input
                            type="number"
                            id="item_quantity"
                            name="item_quantity"
                            value={formData?.item_quantity || ""}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            required
                          />
                          {formErrors?.item_quantity && (
                            <p className="text-red-500 text-sm mt-1">
                              {formErrors.item_quantity}
                            </p>
                          )}
                        </div>
    
                        <div className="mb-4">
                          <label
                            htmlFor="item_quantity_available"
                            className="block text-gray-700 font-medium mb-2"
                          >
                            Item Quantity Available
                          </label>
                          <input
                            type="number"
                            id="item_quantity_available"
                            name="item_quantity_available"
                            value={formData?.item_quantity_available || ""}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            required
                          />
                          {formErrors?.item_quantity_available && (
                            <p className="text-red-500 text-sm mt-1">
                              {formErrors.item_quantity_available}
                            </p>
                          )}
                        </div>

                        <div className="mb-4">
                          <label
                            htmlFor="item_available_date"
                            className="block text-gray-700 font-medium mb-2"
                          >
                            Item Available Date
                          </label>
                          <input
                            type="date"
                            id="item_available_date"
                            name="item_available_date"
                            value={formData?.item_available_date || ""}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            required
                          />
                          {formErrors?.item_available_date && (
                            <p className="text-red-500 text-sm mt-1">
                              {formErrors.item_available_date}
                            </p>
                          )}
                        </div>
    
                        <div className="mb-4">
                          <label
                            htmlFor="item_expiry_date"
                            className="block text-gray-700 font-medium mb-2"
                          >
                            Item Expiry Date
                          </label>
                          <input
                            type="date"
                            id="item_expiry_date"
                            name="item_expiry_date"
                            value={formData?.item_expiry_date || ""}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            required
                          />
                          {formErrors?.item_expiry_date && (
                            <p className="text-red-500 text-sm mt-1">
                              {formErrors.item_expiry_date}
                            </p>
                          )}
                        </div>
            
                        <div className="mb-4">
                          <label
                            htmlFor="file"
                            className="block text-gray-700 font-medium mb-2"
                          >
                            Upload Image
                          </label>
                          <input
                            type="file"
                            id="file"
                            name="file"
                            onChange={handleImageChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            required={isOpen.mode === "new"}
                          />
                          {formErrors?.file && (
                            <p className="text-red-500 text-sm mt-1">
                              {formErrors.file}
                            </p>
                          )}
                          {imagePreview && (
                            <img
                              src={imagePreview}
                              alt="Item Preview"
                              className="mt-4 w-full h-auto object-cover"
                            />
                          )}
                        </div>
    
                        <button
                          type="submit"
                          className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-custom-orange px-8 py-3 text-base font-medium text-white hover:bg-custom-orange focus:outline-none focus:ring-2 focus:ring-custom-orange focus:ring-offset-2"
                        >
                          {isOpen?.mode === "new" ? "Add Item" : "Edit Item"}
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
    </>
  );
  
}
