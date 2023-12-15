// AppRouter.jsx
import { Route, Routes } from 'react-router-dom';
import { Navbar } from '../Navbar';
import * as Pages from '../pages'; // Cambiado a importar todo como 'Pages'
import { PrivateRoute } from './PrivateRoute';

export const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Navbar />}>
          <Route index element={<Pages.HomePage />} />
		  <Route path='users' element={<Pages.UsersPage />} />
          <Route path='login' element={<Pages.LoginPage />} />
          <Route path='register' element={<Pages.RegisterPage />} />
          <Route
            path='dashboard'
            element={
              <PrivateRoute>
                <Pages.DashboardPage />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </>
  );
};
