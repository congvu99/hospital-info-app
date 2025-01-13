import axios from "axios";

const API_URL = "https://your-backend-url.com/api";

export const login = async (username: string, password: string) => {
    const response = await axios.post(`${API_URL}/auth/login`, { username, password });
    return response.data; // Backend trả về token hoặc mã OTP
};

export const verifyOtp = async (otp: string) => {
    const response = await axios.post(`${API_URL}/auth/verify-otp`, { otp });
    return response.data; // Backend trả về trạng thái hoặc token xác thực
};
