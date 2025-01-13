import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import styled from 'styled-components';
import { useToast } from "../../hooks/useToast";

export const OTPFormContainer = styled.div`
    background: linear-gradient(to bottom right, #4caf50, #51cbc0);
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    text-align: center;
`;

export const StyledOTPForm = styled.div`
    width: 100%;
    max-width: 400px;
    padding: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    background-color: #fff;
`;

export const FormTitle = styled.h2`
    margin-bottom: 20px;
`;

export const OtpInputContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
`;

export const OtpInput = styled.input`
    width: 40px;
    height: 40px;
    text-align: center;
    font-size: 18px;
    border: 1px solid #ccc;
    border-radius: 4px;

    &:not(:last-child) {
        margin-right: 10px;
    }

    &::placeholder {
        color: #ccc;
    }
`;

export const ButtonPrimary = styled.button`
    width: 100%;
    padding: 12px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background-color: #0056b3;
    }
`;

export const ErrorMessage = styled.p`
    color: red;
`;

export const ResendButton = styled(ButtonPrimary)`
    margin-top: 10px;
`;

const OTPForm: React.FC = () => {
    const { verifyOtp } = useAuth();
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const inputRefs = useRef<HTMLInputElement[]>([]);
    const { showSuccess, showError } = useToast();
    const [isResendEnabled, setIsResendEnabled] = useState(false);
    const [timer, setTimer] = useState(60);

    useEffect(() => {
        if (otp.join("").length === 6) {
            handleSubmit();
        }
    },[otp]);

    useEffect(() => {
        let interval: NodeJS.Timeout | undefined;
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer(prevTimer => prevTimer - 1);
            }, 1000);
        } else {
            setIsResendEnabled(true);
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [timer]);

    const handleChange = (value: string, index: number) => {
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        if (value && index < 5) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleSubmit = async () => {
        try {
            if (otp.join("") === "123456") {
                await verifyOtp(otp.join(""));
                showSuccess("Đăng nhập thành công.");
                navigate("/");
            } else {
                showError("Mã OTP không hợp lệ.");
                throw new Error("Mã xác thực không chính xác");
            }
        } catch (err: any) {
            setError(err.message || "OTP verification failed");
        }
    };

    const handleResend = () => {
        setOtp(["", "", "", "", "", ""]);
        setError("");
        setIsResendEnabled(false);
        setTimer(60);
        // Gửi yêu cầu gửi OTP lại tại đây
        showSuccess("OTP mới đã được gửi.");
    };

    return (
        <OTPFormContainer>
            <StyledOTPForm>
                <FormTitle>Enter OTP</FormTitle>
                <OtpInputContainer>
                    {otp.map((digit, index) => (
                        <OtpInput
                            key={index}
                            type="text"
                            maxLength={1}
                            value={digit}
                            placeholder="-"
                            onChange={(e) => handleChange(e.target.value, index)}
                            ref={(el) => (inputRefs.current[index] = el as HTMLInputElement)}
                        />
                    ))}
                </OtpInputContainer>
                {error && <ErrorMessage className={"text-start"}>{error}</ErrorMessage>}
                {!isResendEnabled ? (
                    <p>Gửi lại OTP sau {timer} giây</p>
                ) : (
                    <ResendButton onClick={handleResend}>Gửi lại OTP</ResendButton>
                )}
            </StyledOTPForm>
        </OTPFormContainer>
    );
};

export default OTPForm;
