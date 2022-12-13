import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser } from "../features/slices/userSlice";
import "../styles/login.css";

const Login = () => {
  const userInfo = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const history = useNavigate();
  const initialState = {
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
    dispatch(loginUser(user))
      .then(() => {
        history("/tasks");
      })
      .catch(() => {
        e.target.reset();
        toast.error(
          "No se ha podido iniciar sesión, verifique correo y/o contraseña",
          {
            position: "bottom-left",
          }
        );
      });
    setUser(initialState);
  };

  return userInfo.isLoggedIn != true ? (
    <section id='login'>
      <h1 className='login_title'>Iniciar sesión</h1>
      <form onSubmit={(e) => handleSubmit(e)} className='login_form'>
        <div className='form__group field'>
          <input
            type='email'
            name='email'
            id='email'
            className='form__field'
            placeholder='Correo'
            onChange={(e) => handleChange(e)}
          />
          <label htmlFor='email' className='form__label'>
            Correo:{" "}
          </label>
        </div>
        <div className='form__group field'>
          <input
            type='password'
            name='password'
            id='password'
            className='form__field'
            onChange={(e) => handleChange(e)}
            placeholder='Contraseña'
          />
          <label htmlFor='password' className='form__label'>
            Contraseña:{" "}
          </label>
        </div>
        <button type='submit' className='button login_btn'>
          <span className='button-content'>Enviar</span>
        </button>
      </form>
    </section>
  ) : (
    ""
  );
};

export default Login;
