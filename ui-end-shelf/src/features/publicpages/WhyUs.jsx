import React from "react";
import vairety from "../../assests/vairety.png";
import fast from "../../assests/fast.png";
import home from "../../assests/home.png";

const WhyUs = () => {
  return (
    <div className="bg-custom-powerblue h-full">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-16">
          <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
            <div key="vairety1" className="group relative">
              <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                <img
                  src={vairety}
                  alt="varitey"
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <h3 className="mt-6 text-sm text-gray-500">
                <p>
                  <span className="absolute inset-0" />
                  Wide Variety of Product
                </p>
              </h3>
              <p className="text-base font-semibold text-gray-900">
                Choose from a wide range of fresh fruits, vegetables, dairy
                products, and bakery items
              </p>
            </div>
            <div key="fast2" className="group relative">
              <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                <img
                  src={fast}
                  alt="Easy to Use Platform"
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <h3 className="mt-6 text-sm text-gray-500">
                <p>
                  <span className="absolute inset-0" />
                  Easy to Use Platform
                </p>
              </h3>
              <p className="text-base font-semibold text-gray-900">
                Quickly find and purchase the products you need with our
                user-friendly platform.
              </p>
            </div>
            <div key="home3" className="group relative">
              <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                <img
                  src={home}
                  alt="Fast & Convenient"
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <h3 className="mt-6 text-sm text-gray-500">
                <p>
                  <span className="absolute inset-0" />
                  Fast & Convenient
                </p>
              </h3>
              <p className="text-base font-semibold text-gray-900">
                Enjoy fast and convenient buying.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyUs;
