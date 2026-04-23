import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import PrivateRoute from "./components/PrivateRoute";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/"                element={<Home />} />
      <Route path="/admin"           element={<Login />} />
      <Route
        path="/admin/dashboard"
        element={
          <PrivateRoute>
            <Admin />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </BrowserRouter>
);

export default App;
