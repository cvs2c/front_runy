import {
  RequestRegistrarCompra,
  RequestActualizarCompra,
  RequestListarCompra,
  RequestListarCompras,
} from "../api/compra.api.js";
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "../messages/confirmacion.jsx";

export const CompraContext = createContext();

export const useCompras = () => {
  const context = useContext(CompraContext);
  if (!context) {
    throw new Error("useCompras must be used within a CompraProvider");
  }
  return useContext(CompraContext);
};

export const CompraContextProvider = ({ children }) => {
  const Navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const [compras, setCompras] = useState([]);
  const [modalAbrir, setModalAbrir] = useState(false);

  const listarCompras = async () => {
    try {
      const response = await RequestListarCompras();
      setCompras(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const listarCompra = async (id) => {
    try {
      const response = await RequestListarCompra(id);
      console.log(response.data.data);
      return response.data.data;
    } catch (error) {
      console.error(error);
    }
  };

  const registrarCompra = async (compra) => {
    try {
      const response = await RequestRegistrarCompra(compra);
      setErrors([]);
      setModalAbrir(true);

      setTimeout(() => {
        setModalAbrir(false);
      }, 1000);
      console.log(response.data.data);
    } catch (error) {
      const response = error.response;
      console.log(response.data.errors);
      if (response.data.errors) {
        setErrors(response.data.errors);
      }
    }
  };

  const actualizarCompra = async (id, compra) => {
    try {
      const result = await RequestActualizarCompra(id, compra);
      setErrors([]);
      console.log(result.data.data);
      setModalAbrir(true);

      setTimeout(() => {
        setModalAbrir(false);
      }, 1000);
      Navigate("/compras");
    } catch (error) {
      console.log(error);
      // const response = error.response;
      console.log(response.data.errors);
      if (response.data.errors) {
        setErrors(response.data.errors);
      }
    }
  };

  return (
    <CompraContext.Provider
      value={{
        compras,
        listarCompras,
        listarCompra,
        registrarCompra,
        actualizarCompra,
        errors,
        setErrors,
      }}
    >
      <ConfirmModal
        isOpen={modalAbrir}
        onRequestClose={() => setModalAbrir(false)}
      />
      {children}
    </CompraContext.Provider>
  );
};
