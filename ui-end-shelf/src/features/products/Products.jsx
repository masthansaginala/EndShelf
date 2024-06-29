import { useEffect, useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { userFeedItems } from "../../api/loginapi";
import UserOrderItem from "../user/UserOrderItem";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Products() {
  const [isOpenValue, setIsopen] = useState(false);
  const [activeItem, setActiveItem] = useState(null);

  const handleModal = () => {
    setIsopen((prev) => !prev);
  };

  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    try {
      const user_id = localStorage.getItem("user_id");
      const data = await userFeedItems(user_id);
      setItems([...data]);
      console.log("user->", data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="bg-white">
      <p className="flex h-10 items-center justify-center bg-indigo-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
        Get free delivery on orders over $100
      </p>
      <div>
        <main className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-10">
            <h5 className="text-2xl font-bold tracking-tight text-gray-900">Products</h5>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">Products</h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              <div className="lg:col-span-4">
                <div className="bg-white">
                  <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                    <h2 className="sr-only">Products</h2>

                    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                      {items?.length ? (
                        items?.map((product) => (
                          <div key={product?.item_id} className="group">
                            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                              <img
                                src={product?.item_image_url || "https://via.placeholder.com/300"}
                                alt={product?.item_name}
                                className="h-full w-full object-cover object-center group-hover:opacity-75 image-wrapper"
                              />
                            </div>
                            <h3 className="mt-4 text-sm text-gray-700">{product?.item_name}</h3>
                            <p className="mt-1 text-lg font-medium text-gray-900">₹ {product?.item_price}/-</p>
                            <h3 className="text-sm text-gray-700">Available Quantity: {product?.item_quantity_available}</h3>
                            <button
                              onClick={() => {
                                setActiveItem(product);
                                handleModal();
                              }}
                              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                              Buy
                            </button>
                          </div>
                        ))
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <div className="text-center">
                            <p className="text-lg font-semibold text-gray-800 mb-2">No Data Found</p>
                            <p className="text-gray-500">There is no data to display at the moment.</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
      {isOpenValue && (
        <UserOrderItem
          isOpen={isOpenValue}
          handleModal={handleModal}
          product={activeItem}
          setActiveItem={setActiveItem}
          handleFetchOrders={fetchItems}
        />
      )}
    </div>
  );
}
