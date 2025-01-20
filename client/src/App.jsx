import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import BillPage from "./pages/BillPage";
import CustomerPage from "./pages/CustomerPage";
import StatisticsPage from "./pages/StatisticsPage";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";

function App() {
  const storedAuth = JSON.parse(localStorage.getItem("storedUser"));

  return (
    <BrowserRouter>
      <Routes>
        {!storedAuth && (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        )}
        {storedAuth && (
          <>
            <Route path="/" element={<HomePage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/bills" element={<BillPage />} />
            <Route path="/customers" element={<CustomerPage />} />
            <Route path="/statistics" element={<StatisticsPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;