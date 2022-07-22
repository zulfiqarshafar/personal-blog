import { createContext, useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../features/user/userSlice";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    async function getAccessToken() {
      await fetch(`${process.env.REACT_APP_API_HOST}/api/users/refresh-token`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          localStorage.removeItem("accesstoken");
          if (response.ok) return response.json();
          return Promise.reject(response);
        })
        .then((data) => {
          dispatch(setUser(data.username));
          localStorage.setItem("accesstoken", data.accessToken);
        })
        .catch((error) => {
          // console.log(error);
        });
    }

    getAccessToken();
  }, []);

  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
