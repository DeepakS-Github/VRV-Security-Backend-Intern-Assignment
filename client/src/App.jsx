// import './App.css'

import Auth from "./pages/Auth"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Main from "./pages/Main";
import { isAuthenticated } from "./utils/jwtTokenCookie";


// Protected Route Component
export const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return children;
};


// Public Route Component
export const PublicRoute = ({ children }) => {
  if (isAuthenticated()) {
    return <Navigate to="/main" replace />;
  }
  return children;
};


const App = () => {

  return (
    <>
      <Router>
        <Routes>
          {/* Default route */}
          <Route path="/" element={<Navigate to="/login" />} />

          {/* Auth routes */}
          <Route path="/login" element={<PublicRoute><Auth mode="login" /></PublicRoute>} />
          <Route path="/signup" element={<PublicRoute><Auth mode="signup" /></PublicRoute>} />

          {/* Main route */}
          <Route path="/main" element={<ProtectedRoute><Main /></ProtectedRoute>} />

        </Routes>
      </Router>
    </>
  )
}

export default App
