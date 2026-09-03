import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";
import ServicePlaceholderPage from "./pages/ServicePlaceholderPage";
import CareerAssessment from "./pages/CareerAssessment";
import CareerGpsPage from "./pages/CareerGpsPage";
import PublicProfilePage from "./pages/PublicProfilePage";
import LinkedInOptimizerPage from "./pages/LinkedInOptimizerPage";
import ELearningPage from "./pages/ELearningPage";
import EbookReaderPage from "./pages/EbookReaderPage";
import PartnerProgramPage from "./pages/PartnerProgramPage";
import DataAnalystFellowshipPage from "./pages/DataAnalystFellowshipPage";
import PricingPage from "./pages/PricingPage";

function ProtectedRoute({ children }) {
  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/u/:publicId" element={<PublicProfilePage />} />
        <Route path="/public-profile/:publicId" element={<PublicProfilePage />} />
        <Route
          path="/career-assessment"
          element={
            <ProtectedRoute>
              <CareerAssessment />
            </ProtectedRoute>
          }
        />
        <Route path="/career-gps" element={<CareerGpsPage />} />
        <Route path="/linkedin-optimizer" element={<LinkedInOptimizerPage />} />
        <Route path="/partner-program" element={<PartnerProgramPage />} />
        <Route path="/fellowships/:programId" element={<DataAnalystFellowshipPage />} />
        <Route path="/learning/:slug" element={<ProtectedRoute><ELearningPage /></ProtectedRoute>} />
        <Route path="/ebooks/:slug" element={<ProtectedRoute><EbookReaderPage /></ProtectedRoute>} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route path="/resume-builder" element={<ServicePlaceholderPage />} />
        <Route path="/cover-letter-builder" element={<ServicePlaceholderPage />} />
        <Route path="/ats-checker" element={<ServicePlaceholderPage />} />
        <Route path="/interview-simulator" element={<ServicePlaceholderPage />} />
        <Route path="/skill-certification" element={<ServicePlaceholderPage />} />
      </Routes>
    </BrowserRouter>
  );
}
