import CartPage from "@/pages/cartPage";
import DashboardPage from "@/pages/dashboard";
import { Navigate, Route, Routes } from "react-router-dom";

export const RoutesApp = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/carts/:id" element={<CartPage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
