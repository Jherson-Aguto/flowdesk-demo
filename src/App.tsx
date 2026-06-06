import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { MainLayout } from './components/layout/MainLayout';
import { LandingPage } from './pages/LandingPage';
import { Dashboard } from './pages/Dashboard';
import { Records } from './pages/Records';
import { Transactions } from './pages/Transactions';
import { Workflows } from './pages/Workflows';
import { Schedule } from './pages/Schedule';
import { Billing } from './pages/Billing';
import { Files } from './pages/Files';
import { Reports } from './pages/Reports';
import { Settings } from './pages/Settings';
import { WhyFlowDesk } from './pages/WhyFlowDesk';
import { SalesDeck } from './pages/SalesDeck';

const App: React.FC = () => {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* Standalone Landing Page outside sidebar layout */}
          <Route path="/" element={<LandingPage />} />

          {/* Core Operations Dashboard Routes with pathless layout */}
          <Route element={<MainLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="records" element={<Records />} />
            <Route path="transactions" element={<Transactions />} />
            <Route path="workflows" element={<Workflows />} />
            <Route path="schedule" element={<Schedule />} />
            <Route path="billing" element={<Billing />} />
            <Route path="files" element={<Files />} />
            <Route path="reports" element={<Reports />} />
            <Route path="settings" element={<Settings />} />
            <Route path="why-flowdesk" element={<WhyFlowDesk />} />
            <Route path="sales-deck" element={<SalesDeck />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
};

export default App;
