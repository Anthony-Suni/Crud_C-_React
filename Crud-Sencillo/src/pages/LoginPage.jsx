import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; // Importar js-cookie
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap styles

export const LoginPage = () => {
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [error, setError] = useState(false);

  const onLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://ip172-18-0-37-clvuklks9otg00988vsg-8080.direct.labs.play-with-docker.com/api/users');
      const userList = await response.json();

      const userId = parseInt(id, 10);

      if (userId === 0) {
        // Guardar el ID del administrador en una cookie con js-cookie
        Cookies.set('userID', userId);
        navigate('/admin-dashboard', { replace: true });
      } else {
        const userExists = userList.some(user => user.id === userId);

        if (userExists) {
          // Guardar el ID del usuario en una cookie con js-cookie
          Cookies.set('userID', userId);
          navigate('/user-dashboard', {
            replace: true,
            state: {
              logged: true,
              id: userId,
            },
          });
        } else {
          setError(true);
        }
      }

      setId('');
    } catch (error) {
      console.error('Error fetching data:', error);
      // Manejo de errores
    }
  };

  return (
    <div className='container'>
      <form onSubmit={onLogin} className='mt-5'>
        <h1 className='mb-4'>Iniciar Sesión</h1>

        <div className='mb-3'>
          <label htmlFor='id' className='form-label'>
            ID de usuario:
          </label>
          <input
            type='number'
            className='form-control'
            id='id'
            name='id'
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
            autoComplete='off'
          />
        </div>

        {error && <p style={{ color: 'red' }}>El ID de usuario no existe.</p>}

        <button type='submit' className='btn btn-primary'>
          Entrar
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
