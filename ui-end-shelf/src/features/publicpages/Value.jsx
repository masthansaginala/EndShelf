import React from "react";
import pig from "../../assests/pig.png";
import earth from "../../assests/earth.png";
import support from "../../assests/support.png";
import wholesale from "../../assests/wholesale.png";

const Value = () => {
  return (
    <div className="bg-custom-powerblue">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="grid grid-cols-1 mt-6 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          <div key="support3" className="group">
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
              <img
                src={support}
                alt="Support local farmers and businesses by buying their surplus stock."
                className="h-full w-full object-cover object-center group-hover:opacity-75"
              />
            </div>
            <h3 className="mt-4 text-sm text-gray-700">Support Community</h3>
            <p className="mt-1 text-lg font-medium text-gray-900">
              "Support local farmers and businesses by buying their surplus
              stock"
            </p>
          </div>
          <div key="pig1" className="group">
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
              <img
                src={pig}
                alt="Get fresh products at discounted prices"
                className="h-full w-full object-cover object-center group-hover:opacity-75"
              />
            </div>
            <h3 className="mt-4 text-sm text-gray-700">Save Money</h3>
            <p className="mt-1 text-lg font-medium text-gray-900">
              Get fresh products at discounted prices
            </p>
          </div>
          <div key="earth2" className="group">
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
              <img
                src={earth}
                alt="Help reduce food waste and protect the environment"
                className="h-full w-full object-cover object-center group-hover:opacity-75"
              />
            </div>
            <h3 className="mt-4 text-sm text-gray-700">Reduce Waste</h3>
            <p className="mt-1 text-lg font-medium text-gray-900">
              Help reduce food waste and protect the environment
            </p>
          </div>
          <div key="wholesale4" className="group">
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
              <img
                src={wholesale}
                alt="Buy products at whole sum"
                className="h-full w-full object-cover object-center group-hover:opacity-75"
              />
            </div>
            <h3 className="mt-4 text-sm text-gray-700">Whole Sale</h3>
            <p className="mt-1 text-lg font-medium text-gray-900">
              "Buy products at whole sum"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Value;
