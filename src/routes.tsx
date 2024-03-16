import React from 'react';
import {
  Route, Outlet, createBrowserRouter, createRoutesFromElements, RouterProvider,
  Navigate,
} from 'react-router-dom';
import { ContextProvider } from './context';
import {
  Dashboard, Login, SignUp,
} from './pages';
import { PATH } from './utils';

const Layout = () => (
  <ContextProvider>
    <Outlet />
  </ContextProvider>
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route
        path={PATH.get('ROOT').URL}
        element={<Dashboard />}
      />

      {/* Unprotected Routes */}
      <Route
        path={PATH.get('LOGIN').URL}
        element={<Login />}
      />
      <Route
        path={PATH.get('SIGNUP').URL}
        element={<SignUp />}
      />

      {/* Redirection to 404 page or Login */}
      <Route
        path='*'
        element={<Navigate to={PATH.get('LOGIN').URL} />}
      />
    </Route>,
  ),
);

const Router = () => <RouterProvider router={router} />;

export default Router;
