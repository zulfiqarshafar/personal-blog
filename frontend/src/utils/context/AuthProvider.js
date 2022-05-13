import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});

  useEffect(() => {
    // console.log("running");
    async function getAccessToken() {
      await fetch("http://localhost:8080/api/users/refresh-token", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.ok) return response.json();
          return Promise.reject(response);
        })
        .then((data) => {
          // console.log(data);
          setAuth({ accessToken: data.accessToken });
          localStorage.setItem("accesstoken", data.accessToken);
        })
        .catch((error) => console.log(error));
    }

    getAccessToken();
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
