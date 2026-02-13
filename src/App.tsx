import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import PageLayout from "../src/layout/PageLayout";
import { ProtectedRoute } from "./auth/ProtectedRoute";
import Collaborators from "./pages/Collaborators";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<PageLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/collaborators" element={<Collaborators />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
