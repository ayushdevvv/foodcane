import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Donate from "./pages/Donate";
import Matches from "./pages/Matches";
import MatchesList from "./pages/MatchesList";
import Tracking from "./pages/Tracking";
import Profile from "./pages/Profile";
import TrackingIndex from "./pages/TrackingIndex";
function Protected({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
}
function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <Protected>
            <Dashboard />
          </Protected>
        }
      />
      <Route
        path="/donate"
        element={
          <Protected>
            <Donate />
          </Protected>
        }
      />
      <Route
        path="/matches"
        element={
          <Protected>
            <MatchesList />
          </Protected>
        }
      />
      <Route
        path="/matches/:id"
        element={
          <Protected>
            <Matches />
          </Protected>
        }
      />
      <Route
        path="/tracking"
        element={
          <Protected>
            <TrackingIndex />
          </Protected>
        }
      />
      <Route
        path="/tracking/:id"
        element={
          <Protected>
            <Tracking />
          </Protected>
        }
      />
      <Route
        path="/profile"
        element={
          <Protected>
            <Profile />
          </Protected>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
