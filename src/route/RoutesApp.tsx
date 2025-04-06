import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "../Layout/Layout";
import Dashboard from "../Pages/manageProducts/Dashboard";
import NotFound from "../Pages/notFound/NotFound";
import AllProducts from "../Pages/products/AllProducts";
import ProductsCategory from "../Pages/products/ProductsCategory";

import PaymentPage from "../Pages/payment/tab/Payment";
import LoginPage from "../Auth/Login";
import ProtectedRoute from "./ProtectedRoute";
import AddProducts from "../Pages/manageProducts/AddProducts";
import ViewProduct from "../Pages/products/ViewProduct";
import YourOrder from "../Pages/order/Yourorder";
const RoutesApp = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/Login" replace />} />
      <Route path="Login" element={<LoginPage />} />

      <Route path="/Pages" element={<Layout />}>
        {/* <Route path="Home" element={<Home />} /> */}
        <Route
          path="yourorder"
          element={
            <ProtectedRoute allowedRoles={["Admin","User"]}>
              <YourOrder />
            </ProtectedRoute>
          }
        />
        <Route
          path="Products"
          element={
            <ProtectedRoute allowedRoles={["Admin", "User"]}>
              <AllProducts />
            </ProtectedRoute>
          }
        />
        <Route
          path=":title"
          element={
            <ProtectedRoute allowedRoles={["Admin", "User"]}>
              <ProductsCategory />
            </ProtectedRoute>
          }
        />

        <Route path=":category/:id/:name" element={
           <ProtectedRoute allowedRoles={["Admin", "User"]}>
             <ViewProduct />
         </ProtectedRoute>
          } />
        {/* <Route path="Profile" element={<ProfilePage />} /> */}
        <Route path="Payment" element={
           <ProtectedRoute allowedRoles={["Admin", "User"]}>
             <PaymentPage />
         </ProtectedRoute>
          } />
        <Route
          path="Dashboard"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="AddProducts"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <AddProducts />
            </ProtectedRoute>
          }
        />
        {/* <Route path="Settings" element={<Settings />} />
        <Route path="Logout" element={<Logout />} /> */}
        <Route
            path="*"
            element={
              <Navigate to="/404" replace />
            }
          />
      </Route>
      <Route path="/404" element={<NotFound />} />
    </Routes>
  );
};
export default RoutesApp;
