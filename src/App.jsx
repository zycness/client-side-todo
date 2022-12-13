import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { getUser } from "./features/slices/userSlice";
import { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import "./styles/app.css";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, []);

  return (
    <main className='App'>
      <ToastContainer />
      <article>
        <Outlet />
      </article>
    </main>
  );
}

export default App;
