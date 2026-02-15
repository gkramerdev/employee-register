import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import PageLayout from "../src/layout/PageLayout";
import { ProtectedRoute } from "./auth/ProtectedRoute";
import Collaborators from "./pages/Collaborators";
import NewCollaborator from "./pages/NewCollaborator";
import EditCollaborator from "./pages/EditCollaborator";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<PageLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/collaborators" element={<Collaborators />} />
          <Route path="/collaborators/new" element={<NewCollaborator />} />
          <Route path="/collaborators/:id" element={<EditCollaborator />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
