import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";
import ServicePlaceholderPage from "./pages/ServicePlaceholderPage";
import CareerAssessment from "./pages/CareerAssessment";

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
        <Route
          path="/career-assessment"
          element={
            <ProtectedRoute>
              <CareerAssessment />
            </ProtectedRoute>
          }
        />
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
