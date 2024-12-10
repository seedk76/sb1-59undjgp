import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { OnboardingFlow } from './components/onboarding/OnboardingFlow';
import { LoginPage } from './components/auth/LoginPage';
import { SignupPage } from './components/auth/SignupPage';
import { ClientHome } from './components/home/ClientHome';
import { MessagesPage } from './components/messages/MessagesPage';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { useAuthStore } from './store/useAuthStore';
import { ToastContainer } from './components/ui/ToastContainer';

function App() {
  const { user } = useAuthStore();

  const isAdmin = user?.role === 'admin';

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/onboarding"
          element={user ? <Navigate to="/" /> : <OnboardingFlow />}
        />
        <Route
          path="/auth/login"
          element={user ? <Navigate to="/" /> : <LoginPage />}
        />
        <Route
          path="/auth/signup"
          element={user ? <Navigate to="/" /> : <SignupPage />}
        />
        <Route
          path="/messages"
          element={
            user ? (
              <>
                <Header />
                <MessagesPage />
              </>
            ) : (
              <Navigate to="/auth/login" />
            )
          }
        />
        <Route
          path="/admin"
          element={
            isAdmin ? (
              <>
                <Header />
                <AdminDashboard />
              </>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/"
          element={
            <>
              <Header />
              <ClientHome />
            </>
          }
        />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;