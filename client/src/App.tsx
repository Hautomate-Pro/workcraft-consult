import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { RequireAuth } from "./components/RequireAuth";
import { ScrollToTop } from "./components/ScrollToTop";
import { AboutPage } from "./pages/AboutPage";
import { AdminPage } from "./pages/AdminPage";
import { ContactPage } from "./pages/ContactPage";
import { DashboardPage } from "./pages/DashboardPage";
import { FAQPage } from "./pages/FAQPage";
import { HomePage } from "./pages/HomePage";
import { LearnerPortalPage } from "./pages/LearnerPortalPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { RegisterInterestPage } from "./pages/RegisterInterestPage";
import { ServicesPage } from "./pages/ServicesPage";
import { TrainingPage } from "./pages/TrainingPage";

export default function App() {
  return (
    <Routes>
      <Route
        element={
          <>
            <ScrollToTop />
            <Layout />
          </>
        }
      >
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/training" element={<TrainingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/register-interest" element={<RegisterInterestPage />} />
        <Route path="/learner-portal" element={<LearnerPortalPage />} />
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <DashboardPage />
            </RequireAuth>
          }
        />
        <Route
          path="/admin"
          element={
            <RequireAuth role="admin">
              <AdminPage />
            </RequireAuth>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
