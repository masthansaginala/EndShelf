import { useState, useEffect } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { userPlaceOrderApi } from "../../api/loginapi";
import { toast } from "react-toastify";

export default function UserOrderItem({ isOpen, handleModal, product, handleFetchOrders }) {
  const [quantity, setQuantity] = useState(1);
  const [orderPrice, setOrderPrice] = useState(product.item_price);

  useEffect(() => {
    if (product) {
      setQuantity(1);
      setOrderPrice(product.item_price);
    }
  }, [product]);

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity > 0 && newQuantity <= product.item_quantity_available) {
      setQuantity(newQuantity);
      setOrderPrice(newQuantity * product.item_price);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user_id_stored = localStorage.getItem("user_id");
    const formDataToSend = {
      item_id: product.item_id,
      user_id: user_id_stored,
      purchased_quantity: quantity,
      order_price: orderPrice,
      order_status: "Ordered",
    };

    try {
      const data = await userPlaceOrderApi(formDataToSend);
      toast.success("Order placed successfully");
      handleFetchOrders();
      handleModal();
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Failed to place order");
    }
  };

  return (
    <Dialog
      className="relative z-10"
      open={!!isOpen}
      onClose={() => {
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
                <div className="sm:col-span-4 lg:col-span-5">
                  <img
                    src={product.item_image_url || "https://via.placeholder.com/300"}
                    alt="product"
                    className="object-cover object-center h-full w-full group-hover:opacity-75 image-wrapper"
                  />
                </div>
                <div className="sm:col-span-8 lg:col-span-7">
                  <div className="flex justify-center items-center min-h-screen bg-gray-100">
                    <form
                      onSubmit={handleSubmit}
                      className="bg-white p-8 pt-0 rounded-lg  w-full max-w-lg"
                    >
                      <h2 className="text-2xl font-bold mb-6">
                        Place Order for {product.item_name}
                      </h2>
                      <div className="mb-4">
                        <label
                          htmlFor="purchased_quantity"
                          className="block text-gray-700 font-medium mb-2"
                        >
                          Quantity
                        </label>
                        <div className="flex items-center space-x-3">
                          <button
                            type="button"
                            onClick={() => handleQuantityChange(-1)}
                            className="px-3 py-1 bg-gray-200 rounded-md"
                          >
                            -
                          </button>
                          <input
                            type="number"
                            id="purchased_quantity"
                            name="purchased_quantity"
                            value={quantity}
                            readOnly
                            className="w-16 text-center px-3 py-2 border border-gray-300 rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => handleQuantityChange(1)}
                            className="px-3 py-1 bg-gray-200 rounded-md"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="order_price"
                          className="block text-gray-700 font-medium mb-2"
                        >
                          Order Price
                        </label>
                        <input
                          type="text"
                          id="order_price"
                          name="order_price"
                          value={`$${orderPrice}`}
                          readOnly
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        />
                      </div>
                      <button
                        type="submit"
                        className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        Place Order
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
