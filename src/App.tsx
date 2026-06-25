import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import GlobalProvider from "@/components/common/GlobalProvider";

import RegisterPage from "@/app/(auth)/register/page";
import RegisterStepPage from "@/app/(auth)/register/steps/page";

import PortalLayout from "@/app/(portal)/layout";
import DashboardPage from "@/app/(portal)/(dashboard)/page";
import ProfilePage from "@/app/(portal)/profile/page";
import WearablesPage from "@/app/(portal)/wearables/page";
import CareGuidesPage from "@/app/(portal)/care-guides/page";
import PortalAllergiesPage from "@/app/(portal)/allergies/page";

import PatientPage from "@/app/(portal)/patient/page";
import PatientEmrDataPage from "@/app/(portal)/patient/emr-data/page";
import PatientAllergiesPage from "@/app/(portal)/patient/allergies/page";
import PatientAppointmentsPage from "@/app/(portal)/patient/appointments/page";
import PatientConditionsPage from "@/app/(portal)/patient/conditions/page";
import PatientHistoryPage from "@/app/(portal)/patient/history/page";
import PatientLabsPage from "@/app/(portal)/patient/labs/page";
import PatientLettersPage from "@/app/(portal)/patient/letters/page";
import PatientMedicationsPage from "@/app/(portal)/patient/medications/page";

function App() {
  return (
    <BrowserRouter>
      <TooltipProvider>
        <GlobalProvider>
          <Routes>
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/register/steps" element={<RegisterStepPage />} />

            <Route element={<PortalLayout />}>
              <Route index element={<DashboardPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/wearables" element={<WearablesPage />} />
              <Route path="/care-guides" element={<CareGuidesPage />} />
              <Route path="/allergies" element={<PortalAllergiesPage />} />
              <Route path="/patient" element={<PatientPage />} />
              <Route path="/patient/emr-data" element={<PatientEmrDataPage />} />
              <Route path="/patient/allergies" element={<PatientAllergiesPage />} />
              <Route path="/patient/appointments" element={<PatientAppointmentsPage />} />
              <Route path="/patient/conditions" element={<PatientConditionsPage />} />
              <Route path="/patient/history" element={<PatientHistoryPage />} />
              <Route path="/patient/labs" element={<PatientLabsPage />} />
              <Route path="/patient/letters" element={<PatientLettersPage />} />
              <Route path="/patient/medications" element={<PatientMedicationsPage />} />
            </Route>

            <Route path="*" element={<Navigate to="/register" replace />} />
          </Routes>
        </GlobalProvider>
      </TooltipProvider>
    </BrowserRouter>
  );
}

export default App;
