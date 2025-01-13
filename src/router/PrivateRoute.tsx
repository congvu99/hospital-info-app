import React, { FC, ComponentType } from 'react';
import { Route, Navigate, Routes } from 'react-router-dom';

interface PrivateRouteProps {
  component: ComponentType<any>;
  path: string;
}

const PrivateRoute: FC<PrivateRouteProps> = ({ component: Component, path }) => {
  const isAuthenticated = /* logic kiểm tra đăng nhập */ false;

  return (
    <Routes>
      <Route
        path={path}
        element={isAuthenticated ? <Component /> : <Navigate to="/" />}
      />
    </Routes>
  );
};

export default PrivateRoute;
