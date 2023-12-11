import {
  RequestCrearSession,
  RequestCerrarSesion,
} from "../api/usuario.api.js";
import { createContext, useContext, useEffect, useState } from "react";

export const UsuarioContext = createContext();

export const useUsuarios = () => {
  const context = useContext(UsuarioContext);
  if (!context) {
    throw new Error("useUsuarios must be used within a UsuarioProvider");
  }
  return useContext(UsuarioContext);
};

export const UsuarioContextProvider = ({ children }) => {
  const [userLogged, setUserLogged] = useState([]);
  const [userError, setUserError] = useState([]);
  // const [error, setError] = useState([]);

  const crearSession = async (usuario) => {
    try {
      const response = await RequestCrearSession(usuario);
      console.log(response.data.data);
      if (response.data.Status === "success") {
        setUserLogged(response.data.data);
        sessionStorage.setItem("user", JSON.stringify(response.data.data));
      }
    } catch (error) {
      const response = error.response;
      console.error(response.data.error);
      if (response) {
        setUserError(response.data.error);
      }

      // console.log(userError);
    }
  };

  useEffect(() => {
    console.log(userError);
  }, [userError]);

  const cerrarSesion = async () => {
    try {
      const response = await RequestCerrarSesion();

      if (response.data.Status === "success") {
        setUserLogged();
        sessionStorage.removeItem("user");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <UsuarioContext.Provider
      value={{
        crearSession,
        cerrarSesion,
        userLogged,
        userError,
        setUserLogged,
        setUserError,
      }}
    >
      {children}
    </UsuarioContext.Provider>
  );
};
