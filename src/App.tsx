import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import PatientInfo from "./pages/PatientInfo/PatientInfo";
import OTPForm from "./pages/Login/OTPForm";
import LoginForm from "./pages/Login/LoginForm";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import ToastProvider from "./components/Toast/ToastProvider";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return <>{children}</>;
};

const App: React.FC = () => {
    return (
        <ToastProvider>
            <AuthProvider>
                <Router>
                    <Routes>
                        <Route path="/login" element={<LoginForm />} />
                        <Route path="/otp" element={<OTPForm />} />
                        <Route
                            path="/*"
                            element={
                                <ProtectedRoute>
                                    <Header />
                                    <Routes>
                                        <Route path="/" element={<Home />} />
                                        <Route path="/patient-information" element={<PatientInfo />} />
                                    </Routes>
                                    <Footer />
                                </ProtectedRoute>
                            }
                        />
                    </Routes>
                </Router>
            </AuthProvider>
        </ToastProvider>
    );
};

export default App;
