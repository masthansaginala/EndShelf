import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import Login from "./components/login/Login";
import SignUp from "./components/signup/SignUp";
import PublicAuth from "./auth/PublicAuth";
import PrivateAuth from "./auth/PrivateAuth";
import AdminAuth from "./auth/AdminAuth";
import VendorAuth from "./auth/VendorAuth";
import Layout from "./features/layout/Layout";
import Products from "./features/products/Products";
import Profile from "./features/profile/Profile";
import NavBar from "./features/navbar/Navbar";
import UserOrders from "./features/user/UserOrders";
import VendorProducts from "./features/vendor/VendorProducts";
import VendorRequest from "./features/vendor/VendorRequest";
import VendorDisputes from "./features/vendor/VendorDisputes";
import UserDisputes from "./features/user/UserDisputes";
import UsersListAdmin from "./admin/UsersListAdmin";
import VendorsListAdmin from "./admin/VendorsListAdmin";
import ItemsListAdmin from "./admin/ItemsListAdmin";
import OrdersListAdmin from "./admin/OrdersListAdmin";
import DisputesListAdmin from "./admin/DisputesListAdmin";
import EndShelf from "./features/publicpages/EndShelf";
import Value from "./features/publicpages/Value";
import WhyUs from "./features/publicpages/WhyUs";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Navigate to="/end-shelf" />} />
          <Route path="/end-shelf" element={<EndShelf />} />
          <Route path="/value" element={<Value />} />
          <Route path="/why-us" element={<WhyUs />} />
          <Route
            path="/login"
            element={
              <PublicAuth>
                <Login />
              </PublicAuth>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicAuth>
                <SignUp />
              </PublicAuth>
            }
          />
          <Route path="/admin" element={<Layout />}>
            <Route
              path="users-list"
              element={
                <AdminAuth>
                  <UsersListAdmin />
                </AdminAuth>
              }
            />
            <Route
              path="vendors-list"
              element={
                <AdminAuth>
                  <VendorsListAdmin />
                </AdminAuth>
              }
            />
            <Route
              path="items-list"
              element={
                <AdminAuth>
                  <ItemsListAdmin />
                </AdminAuth>
              }
            />
            <Route
              path="orders-list"
              element={
                <AdminAuth>
                  <OrdersListAdmin />
                </AdminAuth>
              }
            />
            <Route
              path="disputes-list"
              element={
                <AdminAuth>
                  <DisputesListAdmin />
                </AdminAuth>
              }
            />
          </Route>
          <Route path="/vendor" element={<Layout />}>
            <Route
              path="home"
              element={
                <VendorAuth>
                  <Products />
                </VendorAuth>
              }
            />
            <Route
              path="vendor-products"
              element={
                <VendorAuth>
                  <VendorProducts />
                </VendorAuth>
              }
            />
            <Route
              path="vendor-request"
              element={
                <VendorAuth>
                  <VendorRequest />
                </VendorAuth>
              }
            />
            <Route
              path="vendor-dispute"
              element={
                <VendorAuth>
                  <VendorDisputes />
                </VendorAuth>
              }
            />
            <Route
              path="orders"
              element={
                <PrivateAuth>
                  <UserOrders />
                </PrivateAuth>
              }
            />
            <Route
              path="disputes"
              element={
                <PrivateAuth>
                  <UserDisputes />
                </PrivateAuth>
              }
            />
            <Route
              path="profile"
              element={
                <PrivateAuth>
                  <Profile />
                </PrivateAuth>
              }
            />
          </Route>
          <Route path="/user" element={<Layout />}>
            <Route
              path="home"
              element={
                <PrivateAuth>
                  <Products />
                </PrivateAuth>
              }
            />
            <Route
              path="profile"
              element={
                <PrivateAuth>
                  <Profile />
                </PrivateAuth>
              }
            />
            <Route
              path="orders"
              element={
                <PrivateAuth>
                  <UserOrders />
                </PrivateAuth>
              }
            />
            <Route
              path="disputes"
              element={
                <PrivateAuth>
                  <UserDisputes />
                </PrivateAuth>
              }
            />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
