import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import {useToast} from "../../hooks/useToast";
import styled from 'styled-components';

export const LoginFormContainer = styled.div`
    background: linear-gradient(to bottom right, #4caf50, #51cbc0);
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    text-align: center;
`;

export const StyledLoginForm = styled.div`
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

export const FormControl = styled.input`
  width: 90%;
  margin: 10px auto;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
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

const LoginForm: React.FC = () => {
    const { login } = useAuth();
    const { showSuccess, showError } = useToast();
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (username === "test@example.com" && password === "12345") {
                login("fake-token");
                // showSuccess("Đăng nhập thành công.");
                navigate("/otp");
            } else {
                showError("Tài khoản hoặc mật khẩu không chính xác.");
                throw new Error("Invalid username or password");
            }
        } catch (err: any) {
            setError(err.message || "Login failed");
        }
    };

    return (
        <LoginFormContainer>
            <StyledLoginForm className="card">
                <FormTitle>Login</FormTitle>
                <form onSubmit={handleSubmit} className="login-form">
                    <div>
                        <FormControl
                            type="text"
                            placeholder="Email or Phone"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <FormControl
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <ul className={"text-start"}>
                        <li>test@example.com</li>
                        <li>12345</li>
                    </ul>
                    {error && <ErrorMessage className={"text-start"}>{error}</ErrorMessage>}
                    <ButtonPrimary type="submit">Login</ButtonPrimary>
                </form>

            </StyledLoginForm>
        </LoginFormContainer>
    );
};

export default LoginForm;
