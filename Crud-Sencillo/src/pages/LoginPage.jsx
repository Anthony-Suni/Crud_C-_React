import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../hook/useForm';

import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap styles

export const LoginPage = () => {
  const navigate = useNavigate();

  const { name, email, password, onInputChange, onResetForm } = useForm({
    name: '',
    email: '',
    password: '',
  });

  const onLogin = (e) => {
    e.preventDefault();

    navigate('/dashboard', {
      replace: true,
      state: {
        logged: true,
        name,
      },
    });

    onResetForm();
  };

  return (
    <div className='container'>
      <form onSubmit={onLogin} className='mt-5'>
        <h1 className='mb-4'>Iniciar Sesión</h1>

        <div className='mb-3'>
          <label htmlFor='name' className='form-label'>
            Nombre:
          </label>
          <input
            type='text'
            className='form-control'
            id='name'
            name='name'
            value={name}
            onChange={onInputChange}
            required
            autoComplete='off'
          />
        </div>

        <div className='mb-3'>
          <label htmlFor='email' className='form-label'>
            Email:
          </label>
          <input
            type='email'
            className='form-control'
            id='email'
            name='email'
            value={email}
            onChange={onInputChange}
            required
            autoComplete='off'
          />
        </div>

        <div className='mb-3'>
          <label htmlFor='password' className='form-label'>
            Contraseña:
          </label>
          <input
            type='password'
            className='form-control'
            id='password'
            name='password'
            value={password}
            onChange={onInputChange}
            required
            autoComplete='off'
          />
        </div>

        <button type='submit' className='btn btn-primary'>
          Entrar
        </button>
      </form>
    </div>
  );
};

export default LoginPage;