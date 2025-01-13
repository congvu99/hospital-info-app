
export const isValidUsername = (username: string) => {
    return /^(?:\d{10}|\S+@\S+\.\S+)$/.test(username); // Số điện thoại hoặc email
};

export const isValidOtp = (otp: string) => {
    return /^\d{6}$/.test(otp); // OTP phải là 6 chữ số
};
