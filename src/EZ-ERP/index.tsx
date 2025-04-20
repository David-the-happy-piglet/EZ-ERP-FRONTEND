import { Navigate, Route, Routes } from "react-router-dom";
import WelcomeBadge from "./WelcomeBadge";
import Account from "./Account";
import Customer from "./Customer";
import Orders from "./Orders";
import Finance from "./Finance";
import Overview from "./Overview";
import MainPageNav from "./MainPageNav";
import ProtectedRoute from "./Login/ProtectedRoute";
import HumanResource from "./HumanResource";
import ProjectManagement from "./PM";
import './style.css';

export default function EZ_ERP() {
    return (
        <div id="ezerp">
            <WelcomeBadge />
            <MainPageNav />
            <Routes>
                <Route path="EZERP/Overview/*" element={<Overview />} />
                <Route path="/" element={<Navigate to="EZERP/Overview" />} />
                <Route path="EZERP/Orders/*" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
                <Route path="EZERP/Customers/*" element={<ProtectedRoute><Customer /></ProtectedRoute>} />
                <Route path="EZERP/Finance/*" element={<ProtectedRoute><Finance /></ProtectedRoute>} />
                <Route path="EZERP/Account/*" element={<ProtectedRoute><Account /></ProtectedRoute>} />
                <Route path="EZERP/HR/*" element={<ProtectedRoute><HumanResource /></ProtectedRoute>} />
                <Route path="EZERP/PM/*" element={<ProtectedRoute><ProjectManagement /></ProtectedRoute>} />
            </Routes>
        </div>
    )
}