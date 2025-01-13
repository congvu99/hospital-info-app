﻿import React from "react";
import ToastContainer from "./ToastContainer";

const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <>
            <ToastContainer />
            {children}
        </>
    );
};

export default ToastProvider;
