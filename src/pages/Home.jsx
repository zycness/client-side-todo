import React from "react";
import { Link } from "react-router-dom";
import { RiTodoLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import "../styles/home.css";

const Home = () => {
  const userInfo = useSelector((state) => state.users);

  return (
    <section id='home'>
      <ul className='home_list'>
        <h1 className='home_title'>TODO LIST</h1>
        <h2 className='home_subtitle'>Características: </h2>
        <li className='home_list_item'>
          <h3 className='home_list_item_desc'>- Registro de usuarios</h3>
        </li>
        <li className='home_list_item'>
          <h3 className='home_list_item_desc'>
            - Creación, edición y eliminación de tareas
          </h3>
        </li>
        <li className='home_list_item'>
          <h3 className='home_list_item_desc'>
            - Almacenamiento en base de datos
          </h3>
        </li>
        <li className='home_list_item'>
          <Link to='/register' className='home_link'>
            <button className='button'>
              <span className='button-content'>Registrarse</span>
            </button>
          </Link>{" "}
          {userInfo.isLoggedIn != true ? (
            <>
              <span>o </span>
              <Link to={"/login"} className='home_link_login'>
                iniciar sesión
              </Link>
            </>
          ) : (
            ""
          )}
        </li>
      </ul>
      <RiTodoLine size={"15rem"} />
    </section>
  );
};

export default Home;
