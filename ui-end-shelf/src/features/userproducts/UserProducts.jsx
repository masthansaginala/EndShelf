import { PencilSquareIcon, XMarkIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import AlertModal from "../../components/alertModal/AlertModal";
import { deleteItemApi, getVendorItems } from "../../api/loginapi";
import PageNotFound from "../pagenotfound/PageNotFound";
import { toast } from "react-toastify";
import AddItem from "../vendor/AddItem";

const UserProducts = () => {
  const [isOpenValue, setIsopen] = useState({ isOpen: false });
  const [alertModal, setAlertModal] = useState(false);
  const [vendorProducts, setVendorProducts] = useState([]);

  const handleDeleteItem = async () => {
    try {
      const res = await deleteItemApi(alertModal?.id);
      toast.success("Deleted successfully");
      handleVendorProducts();
      setAlertModal(false);
    } catch (e) {
      console.log("error", e);
    }
  };

  const onConfirm = () => {
    handleDeleteItem();
  };

  const onCancel = () => {
    setAlertModal(false);
  };

  const handleModal = () => {
    setIsopen({ isOpen: false });
  };

  const handleVendorProducts = async () => {
    try {
      const vendor_id = localStorage.getItem("vendor_id");
      const data = await getVendorItems(vendor_id);
      setVendorProducts(data);
    } catch (error) {
      console.error("Error fetching vendor items:", error);
    }
  };

  useEffect(() => {
    handleVendorProducts();
  }, []);

  return (
    <div>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Products</h2>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Your Products</h2>
            <button
              type="button"
              onClick={() => {
                setIsopen({ isOpen: true, mode: "new" });
              }}
              className="mt-6 flex  items-center justify-center rounded-lg border border-transparent bg-custom-orange px-6 py-3 text-base font-medium text-white hover:bg-custom-orange focus:outline-none focus:ring-2 focus:ring-custom-orange focus:ring-offset-2"
            >
              Add Item to Endshelf
            </button>
          </div>
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {vendorProducts?.length ? (
              vendorProducts?.map((product) => (
                <div key={product.item_id} className="group relative">
                  <div className="overflow-hidden bg-gray-200 rounded-lg aspect-w-1 aspect-h-1">
                    <img
                      src={
                        product?.item_image_url ||
                        "https://via.placeholder.com/300"
                      }
                      alt="product"
                      className="object-cover object-center h-full w-full group-hover:opacity-75 image-wrapper"
                    />
                  </div>
                  <h3 className="mt-4 text-sm text-gray-700">
                    {product?.item_name}
                  </h3>
                  <div className="flex justify-between items-center">
                    <p className="mt-1 text-lg font-medium text-gray-900">
                      ${product?.item_price}
                    </p>
                    <div className="flex justify-end space-x-2">
                      <div
                        onClick={() => {
                          setIsopen({
                            isOpen: true,
                            product: {
                              item_id: product?.item_id,
                              item_name: product?.item_name,
                              item_category: product?.item_category,
                              item_price: product?.item_price,
                              item_quantity: product?.item_quantity,
                              item_quantity_available: product?.item_quantity_available,
                              item_expiry_date: new Date(product?.item_expiry_date)
                                .toISOString()
                                .split("T")[0],
                              item_available_date: new Date(product?.item_available_date)
                                .toISOString()
                                .split("T")[0],
                              item_image_url: product?.item_image_url,
                              vendor_id: product?.vendor_id,
                              user_id: product?.user_id,
                            },
                            mode: "edit",
                          });
                        }}
                      >
                        <PencilSquareIcon className="w-6 h-6 cursor-pointer text-blue-500" />
                      </div>
                      <div
                        onClick={() => {
                          setAlertModal({ isOpen: true, id: product?.item_id });
                        }}
                      >
                        <XMarkIcon className="w-6 h-6 cursor-pointer text-red-500" />
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <></>
            )}
          </div>

          {vendorProducts?.length ? (
            <></>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <p className="text-lg font-semibold text-gray-800 mb-2">
                  No Data Found
                </p>
                <p className="text-gray-500">
                  There is no data to display at the moment.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      {isOpenValue?.isOpen && (
        <AddItem
          isOpen={isOpenValue}
          product={isOpenValue?.product}
          handleModal={handleModal}
          handleVendorProducts={handleVendorProducts}
        />
      )}
      {!!alertModal?.isOpen && (
        <AlertModal message={""} onConfirm={onConfirm} onCancel={onCancel} />
      )}
    </div>
  );
};

export default UserProducts;
