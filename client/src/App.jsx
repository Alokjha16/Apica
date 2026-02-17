import React from "react";
import { Route, Routes } from "react-router-dom";

import Landing from "./pages/Landing";
import DashboardLayout from "./components/layout/DashboardLayout";

import DashboardPage from "./pages/DashboardPage";
import CustomersPage from "./pages/CustomersPage";
import ProductsPage from "./pages/ProductsPage";
import AIEnginePage from "./pages/AIEnginePage";
import CampaignsPage from "./pages/CampaignsPage";
import CompliancePage from "./pages/CompliancePage";
import SettingsPage from "./pages/SettingsPage";

const App = () => {
  return (
    <Routes>
      {/* Landing */}
      <Route path="/" element={<Landing />} />

      {/* Dashboard Layout Wrapper */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="customers" element={<CustomersPage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="ai-engine" element={<AIEnginePage />} />
        <Route path="campaigns" element={<CampaignsPage />} />
        <Route path="compliance" element={<CompliancePage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
    </Routes>
  );
};

export default App;
