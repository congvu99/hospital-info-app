import { useState } from "react";
import { login, verifyOtp } from "../services/login/authService";

export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const loginHandler = async (username: string, password: string) => {
        const response = await login(username, password);
        if (response.status === "otp_required") {
            window.location.href = "/otp";
        } else {
            setIsAuthenticated(true);
        }
    };

    const verifyOtpHandler = async (otp: string) => {
        const response = await verifyOtp(otp);
        if (response.status === "verified") {
            setIsAuthenticated(true); // Xác thực thành công
        } else {
            throw new Error("Invalid OTP");
        }
    };

    return {
        isAuthenticated,
        login: loginHandler,
        verifyOtp: verifyOtpHandler,
    };
};
