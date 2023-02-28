import {createContext, useContext, useMemo, useState} from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";
import { loginUser } from "../services/login";

const AuthContext = createContext();

export const AuthProvider = ({ children, userData }) => {
  const [user, setUser] = useLocalStorage("user", userData);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const login = async (data) => {
    setLoading(true);
    setError(null);
    await loginUser(data)
        .then(response => {
          setLoading(false);
          setUser(response);
          navigate("/dashboard/profile", { replace: true });
        }).catch(err => {
          console.log(err);
          setLoading(false);
          setUser(null);
          setError({mess: 'Account invalid'});
        })
  };

  const logout = () => {
    setUser(null);
    navigate("/", { replace: true });
  };

  const value = useMemo(
    () => ({
      user,
      error,
      loading,
      login,
      logout
    }),
    [user, error, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
