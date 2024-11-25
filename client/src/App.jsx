// import './App.css'

import Auth from "./pages/Auth"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

function App() {

  return (
    <>
      <Router>
        <Routes>
          {/* Default route */}
          <Route path="/" element={<Navigate to="/login" />} />

          {/* Auth routes */}
          <Route path="/login" element={<Auth mode="login" />} />
          <Route path="/signup" element={<Auth mode="signup" />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
