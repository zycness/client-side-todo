import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../features/slices/userSlice";
import { FaHome } from "react-icons/fa";
import { MdLogin, MdLogout, MdTask } from "react-icons/md";
import { AiOutlineForm } from "react-icons/ai";
import "../styles/navbar.css";

const Navbar = () => {
  const userInfo = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const history = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser())
      .then(() => history("/"))
      .then(() => location.reload());
  };

  return (
    <nav id='navbar'>
      <ul className='navbar_list'>
        <li className='navbar_item'>
          <Link to={"/"} className='navbar_link'>
            <FaHome size={"1.5rem"} style={{ margin: "0 5px" }} />
            Inicio
          </Link>
        </li>
        {userInfo.isLoggedIn != true ? (
          <li className='navbar_item'>
            <Link to={"/login"} className='navbar_link'>
              <MdLogin size={"1.5rem"} style={{ margin: "0 5px" }} />
              Iniciar sesión
            </Link>
          </li>
        ) : (
          ""
        )}
        <li className='navbar_item'>
          <Link to={"/register"} className='navbar_link'>
            <AiOutlineForm size={"1.5rem"} style={{ margin: "0 5px" }} />
            Registrarse
          </Link>
        </li>
        {userInfo.isLoggedIn == true ? (
          <li className='navbar_item'>
            <Link to={"/tasks"} className='navbar_link'>
              <MdTask size={"1.5rem"} style={{ margin: "0 5px" }} />
              Tareas
            </Link>
          </li>
        ) : (
          ""
        )}
        {userInfo.isLoggedIn == true ? (
          <li className='navbar_item'>
            <Link to={"/"} onClick={handleLogout} className='navbar_link'>
              <MdLogout size={"1.5rem"} style={{ margin: "0 5px" }} />
              Logout
            </Link>
          </li>
        ) : (
          ""
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
