import { Navigate, Route, Routes } from "react-router-dom";
import WelcomeBadge from "./WelcomeBadge";
import Account from "./Account";
import Customer from "./Customer";
import Order from "./Order";
import Finance from "./Finance";
import Overview from "./Overview";
import MainPageNav from "./MainPageNav";
import ProtectedRoute from "./Login/ProtectedRoute";

export default function EZ_ERP() {
    return (
        <div id="ezerp">
            <WelcomeBadge />
            <MainPageNav />
            <Routes>
                <Route path="/Overview" element={<ProtectedRoute><Overview /></ProtectedRoute>} />
                <Route path="/" element={<ProtectedRoute><Navigate to="/Overview" /></ProtectedRoute>} />
                <Route path="/Order" element={<ProtectedRoute><Order /></ProtectedRoute>} />
                <Route path="/Customer" element={<ProtectedRoute><Customer /></ProtectedRoute>} />
                <Route path="/Finance" element={<ProtectedRoute><Finance /></ProtectedRoute>} />
                <Route path="/Account" element={<ProtectedRoute><Account /></ProtectedRoute>} />
            </Routes>
        </div>
    )
}