// Navbar.jsx
import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';

export const Navbar = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const onLogout = () => {
    navigate('/login', {
      replace: true,
    });
  };

  return (
    <>
      <header style={{ width: '100%', maxWidth: '1200px', margin: '50 auto', backgroundColor: '#your-color' }}>
        <h1>
          <Link to='/'>logo</Link>
        </h1>

        {state?.logged ? (
          <div className='user'>
            <span className='username'>{state?.name}</span>
            <button className='btn-logout' onClick={onLogout}>
              Cerrar sesión
            </button>
          </div>
        ) : (
          <nav>
            
            <Link to='/login'>login</Link>
            <Link to='/register'>Registro</Link> 
            
            {/* <Link to='/rating'>Ver Ratings</Link> */}
            {/* <Link to='/register'>Registro</Link> */}
            {/* <Link to='/users'>Users</Link> */}
          </nav>
        )}
      </header>

      <Outlet />
    </>
  );
};

