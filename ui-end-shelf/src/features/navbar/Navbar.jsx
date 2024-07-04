import { useEffect, useState } from "react";
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from "@headlessui/react";
import {
  Bars3Icon,
  ChevronDownIcon,
  UserIcon,
  HomeIcon,
  ClipboardDocumentListIcon,
  XMarkIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import logo from "../../assests/endshelftransparent.png";
import AddVendorModal from "../vendor/AddVendor";

const publicNavigation = [
  { name: "EndShelf", href: "/end-shelf" },
  { name: "Value", href: "/value" },
  { name: "Why Us", href: "/why-us" },
];

const adminNavigation = [
  { name: "Users", href: "/admin/users-list" },
  { name: "Vendors", href: "/admin/vendors-list" },
  { name: "Items", href: "/admin/items-list" },
  { name: "Orders", href: "/admin/orders-list" },
  { name: "Disputes", href: "/admin/disputes-list" },
];

const userNavigation = [
  { name: "Home", href: "/user/home" },
  { name: "Orders", href: "/user/orders" },
  { name: "Disputes", href: "/user/disputes" },
];

const vendorNavigation = [
  { name: "Home", href: "/vendor/home" },
  { name: "Vendor Products", href: "/vendor/vendor-products" },
  { name: "Vendor Requests", href: "/vendor/vendor-request" },
  { name: "Vendor Disputes", href: "/vendor/vendor-dispute" },
  { name: "Orders", href: "/vendor/orders" },
  { name: "Disputes", href: "/vendor/disputes" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function NavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, logout, isVendor, isAdmin } = useAuth();
  const [addVendor, setAddVendor] = useState(false);

  const navigation = isAuthenticated
    ? isAdmin
      ? adminNavigation
      : isVendor
      ? vendorNavigation
      : userNavigation
    : publicNavigation;

  return (
    <header className="header-wrapper h-16 bg-custom-focyell">
      <nav
        className="mx-auto flex items-center justify-between p-3 lg:px-8 "
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link
            to="/"
            className="-m-1.5 p-1.5 text-white d-flex align-items-center"
          >
            <span className="sr-only">End Shelf</span>
            {/* <UserCircleIcon className="h-5 w-5 mr-1 text-white" /> */}
            <img className="h-8 w-auto" src={logo} alt="Logo" />
            End Self
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="text-sm font-semibold leading-6 nav-color-wrapper"
            >
              {item.name}
            </Link>
          ))}
          {isAuthenticated && !isAdmin && !isVendor && (
            <p
              onClick={() => {
                setAddVendor({ isOpen: true, mode: "new" });
              }}
              className="text-white text-sm font-semibold leading-6 nav-color-wrapper"
            >
              Add Vendor
            </p>
          )}
        </PopoverGroup>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center">
          {isAuthenticated ? (
            <Menu as="div" className="relative ml-3">
              <div>
                <MenuButton className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Open user menu</span>
                  <UserCircleIcon className="h-5 w-5 mr-1 text-white" />
                </MenuButton>
              </div>
              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
              >
                <MenuItem>
                  {({ active }) => (
                    <button
                      className={classNames(
                        active ? "bg-gray-100" : "",
                        "block w-full px-4 py-2 text-sm text-left text-gray-700"
                      )}
                      onClick={logout}
                    >
                      Sign out
                    </button>
                  )}
                </MenuItem>
              </MenuItems>
            </Menu>
          ) : (
            <>
              <Link
                to="/signup"
                className="-mx-3 block text-sm text-white rounded-lg px-3 py-2.5 text-base font-semibold leading-7  "
              >
                Sign Up
              </Link>
              <Link
                to="/login"
                className="-mx-3 block text-sm text-white mx-2 rounded-lg px-3 py-2.5 text-base font-semibold leading-7  "
              >
                Log In
              </Link>
            </>
          )}
        </div>
      </nav>
      <Dialog
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10 text-white" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link to="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              {/* <img className="h-8 w-auto" src={logo} alt="Logo" /> */}
              <UserCircleIcon className="h-5 w-5 mr-1 text-white" />
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-white "
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    {item.name}
                  </Link>
                ))}
                {isAuthenticated && !isAdmin && !isVendor && (
                  <p
                    onClick={() => {
                      setAddVendor({ isOpen: true, mode: "new" });
                    }}
                    className="text-white text-sm font-semibold leading-6 nav-color-wrapper"
                  >
                    Add Vendor
                  </p>
                )}
              </div>
              <div className="py-6">
                {isAuthenticated ? (
                  <Disclosure as="div" className="-mx-3">
                    {({ open }) => (
                      <>
                        <DisclosureButton className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                          <UserIcon className="h-5 w-5 mr-1" />
                          Account
                          <ChevronDownIcon
                            className={classNames(
                              open ? "rotate-180" : "",
                              "h-5 w-5 flex-none"
                            )}
                            aria-hidden="true"
                          />
                        </DisclosureButton>
                        <DisclosurePanel className="mt-2 space-y-2">
                          <button
                            className="block w-full px-4 py-2 text-sm text-left text-gray-700"
                            onClick={logout}
                          >
                            Sign out
                          </button>
                        </DisclosurePanel>
                      </>
                    )}
                  </Disclosure>
                ) : (
                  <Link
                    to="/login"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Log in
                  </Link>
                )}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
      {addVendor && (
        <AddVendorModal
          isOpen={addVendor}
          handleModal={() => {
            setAddVendor(false);
          }}
          handleVendorProducts={() => {}}
        />
      )}
    </header>
  );
}
