import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "../Layout/Layout";
import Home from "../Pages/Home";
import ProfilePage from "../Pages/Profile";
import Dashboard from "../Pages/Dashboard";
import Settings from "../Pages/Settings";
import Logout from "../Pages/Logout";
import NotFound from "../Pages/NotFound";
import AllProducts from "../Pages/AllProducts";
import ProductsCategory from "../Pages/ProductsCategory";
import ViewProduct from "../Pages/ViewProduct";
import PaymentPage from "../Pages/Payment";
import LoginPage from "../Auth/Login";
const RoutesApp = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/Login" replace />} />
      <Route path='Login' element ={<LoginPage/> }/>
      
      <Route path="/Pages" element={<Layout />}>
        <Route
          path="Home"
          element={
              <Home />
          }
        />
        <Route
          path="Products"
          element={
              <AllProducts />
          }
        />
        <Route
          path=":title"
          element={
              <ProductsCategory />
          }
        />
        <Route
          path=":category/:id/:name"
          element={
              <ViewProduct />
          }
        />
        <Route
          path="Profile"
          element={
              <ProfilePage />
          }
        />
        <Route
          path="Payment"
          element={
              <PaymentPage />
          }
        />
        <Route
          path="Dashboard"
          element={
              <Dashboard />
          }
        />
        <Route
          path="Settings"
          element={
              <Settings />
          }
        />
        <Route
          path="Logout"
          element={
              <Logout />
          }
        />
          {/* <Route
            path="*"
            element={
              <Navigate to="/404" replace />
            }
          /> */}
      </Route>
            <Route
              path="/404"
              element={
                <NotFound />
              }
            />
    </Routes>
  );
};
export default RoutesApp;
