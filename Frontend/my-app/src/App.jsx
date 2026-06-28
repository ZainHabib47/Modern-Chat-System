import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute  from "./components/ProtectedRoute";
import Login from "./Auth";
import Dashboard from "./dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
