import DashboardPage from "@/pages/dashboard";
import { Navigate, Route, Routes } from "react-router-dom";

export const RoutesApp = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
