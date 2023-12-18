import { Route, Routes } from 'react-router-dom';
import { Navbar } from '../Navbar';
import * as Pages from '../pages';
import { PrivateRoute } from './PrivateRoute';

export const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Navbar />}>
          <Route index element={<Pages.HomePage />} />
          <Route path='users' element={<Pages.UsersPage />} />
          <Route path='rating' element={<Pages.RatingMovies />} />
          <Route path='login' element={<Pages.LoginPage />} />
          <Route path='register' element={<Pages.RegisterPage />} />
          <Route path='user-dashboard' element={<Pages.DashboardPageUser />} />
          <Route path='admin-dashboard' element={<Pages.DashboardPageAdmin />} />
          
          {/* Nueva ruta para la página de "Agregar Película" */}
          <Route path='agregar-pelicula' element={<Pages.AgregarPelicula />} />

        </Route>
      </Routes>
    </>
  );
};

export default AppRouter;
