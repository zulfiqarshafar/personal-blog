import { Alert, Grow } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../utils/context/AuthProvider";
import "./Login.css";

function Login() {
  const accessToken = localStorage.getItem("accesstoken");

  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/admin/articles";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);

  const userRef = useRef();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMessage("");
    setAlertOpen(false);
  }, [username, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:8080/api/users/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => {
        if (response.ok) return response.json();
        return Promise.reject(response);
      })
      .then((data) => {
        // console.log(data);
        const accessToken = data?.accessToken;
        setAuth({ username, accessToken });
        localStorage.setItem("accesstoken", accessToken);
        setUsername("");
        setPassword("");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        // console.log(error);
        setAlertOpen(true);
        if (error.status === 400) {
          setErrMessage("Unauthorized!");
        } else if (error.status === 401) {
          setErrMessage("Wrong password!");
        } else {
          setErrMessage("Login Failed");
        }
      });
  };

  return !accessToken ? (
    <section className="login">
      <h1 className="login__blog-link">
        <a href="/">BLOG</a>
      </h1>
      {/* <p
        ref={errRef}
        className={errMessage ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMessage}
      </p> */}
      <form className="login__form" onSubmit={handleSubmit}>
        <Grow in={alertOpen} unmountOnExit={true}>
          <Alert
            severity="error"
            variant="filled"
            className="login__form__alert"
            aria-live="assertive"
          >
            {errMessage}
          </Alert>
        </Grow>

        <label htmlFor="login__form__username">Username</label>
        <input
          type="text"
          id="login__form__username"
          ref={userRef}
          placeholder="username"
          autoComplete="off"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <label htmlFor="login__form__password">Password</label>
        <input
          type="password"
          id="login__form__password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button type="submit">Log In</button>
      </form>
    </section>
  ) : (
    <Navigate to="/admin/articles" />
  );
}

export default Login;
