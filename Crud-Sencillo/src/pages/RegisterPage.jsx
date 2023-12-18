import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../hook/useForm';

import 'bootstrap/dist/css/bootstrap.min.css'; // Importar estilos de Bootstrap

export const RegisterPage = () => {
  const navigate = useNavigate();

  const { gender, age, occupation, zipCode, onInputChange, onResetForm } = useForm({
    gender: null,
    age: null,
    occupation: null,
    zipCode: null,
  });

  const onRegister = async (e) => {
    e.preventDefault();

    try {
      // Crear un objeto con los datos a enviar, excluyendo "id"
      const userData = {
        gender,
        age,
        occupation,
        zipCode,
      };

      // Realizar la petición POST al servidor API
      const response = await fetch('http://ip172-18-0-37-clvuklks9otg00988vsg-8080.direct.labs.play-with-docker.com/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        // Redireccionar a la página de dashboard si la petición es exitosa
        navigate('/login', {
          replace: true,
          state: {
            logged: true,
          },
        });

        // Resetear el formulario después del registro
        onResetForm();
      } else {
        // Manejar errores en caso de una respuesta no exitosa
        console.error('Error al registrar el usuario');
      }
    } catch (error) {
      console.error('Error de red:', error.message);
    }
  };

  return (
    <div className='container'>
      <form onSubmit={onRegister} className='mt-5'>
        <h1 className='mb-4'>Registrarse</h1>

        <div className='mb-3'>
          <label htmlFor='gender' className='form-label'>
            Género:
          </label>
          <input
            type='text'
            className='form-control'
            id='gender'
            name='gender'
            value={gender}
            onChange={onInputChange}
            autoComplete='off'
          />
        </div>

        <div className='mb-3'>
          <label htmlFor='age' className='form-label'>
            Edad:
          </label>
          <input
            type='text'
            className='form-control'
            id='age'
            name='age'
            value={age}
            onChange={onInputChange}
            autoComplete='off'
          />
        </div>

        <div className='mb-3'>
          <label htmlFor='occupation' className='form-label'>
            Ocupación:
          </label>
          <input
            type='text'
            className='form-control'
            id='occupation'
            name='occupation'
            value={occupation}
            onChange={onInputChange}
            autoComplete='off'
          />
        </div>

        <div className='mb-3'>
          <label htmlFor='zipCode' className='form-label'>
            zipCode:
          </label>
          <input
            type='text'
            className='form-control'
            id='zipCode'
            name='zipCode'
            value={zipCode}
            onChange={onInputChange}
            autoComplete='off'
          />
        </div>

        <button type='submit' className='btn btn-primary'>
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
