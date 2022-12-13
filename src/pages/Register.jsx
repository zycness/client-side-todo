import React, { useState } from "react";
import { createUser } from "../features/slices/userSlice";
import { useDispatch } from "react-redux";
import "../styles/register.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const initialState = {
    name: "",
    email: "",
    password: "",
  };
  const [user, setUser] = useState(initialState);

  const handleChange = (e) => {
    setUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user);
    dispatch(createUser(user))
      .then(() => {
        history("/login");
      })
      .catch(() => {
        e.target.reset();
        toast.error(
          "No se ha podido registrar, verifique correo y/o contraseña",
          {
            position: "bottom-left",
          }
        );
      });
    setUser(initialState);
  };

  return (
    <section id='register'>
      <h1 className='register_title'>Registrarse</h1>
      <form onSubmit={(e) => handleSubmit(e)} className='register_form'>
        <div className='form__group'>
          <input
            type='text'
            name='name'
            placeholder='Nombre'
            id='name'
            onChange={(e) => handleChange(e)}
            required
            className='form__field'
          />
          <label htmlFor='name' className='form__label'>
            Nombre:{" "}
          </label>
        </div>
        <div className='form__group'>
          <input
            type='email'
            name='email'
            id='email'
            placeholder='Correo'
            onChange={(e) => handleChange(e)}
            required
            className='form__field'
          />
          <label htmlFor='email' className='form__label'>
            Correo:{" "}
          </label>
        </div>
        <div className='form__group'>
          <input
            type='password'
            name='password'
            id='password'
            placeholder='Contraseña'
            onChange={(e) => handleChange(e)}
            required
            className='form__field'
          />
          <label htmlFor='password' className='form__label'>
            Contraseña:{" "}
          </label>
        </div>

        <button type='submit' className='button register_btn'>
          <span className='button-content'>Enviar</span>
        </button>
      </form>
    </section>
  );
};

export default Register;
