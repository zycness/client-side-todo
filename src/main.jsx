import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Tasks from "./pages/Tasks";
import { store } from "./features/store/store";
import { Provider } from "react-redux";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

import "./styles/mediaqueries.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<App />}>
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
            <Route path='tasks' element={<Tasks />} />
            <Route index element={<Home />} />
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
