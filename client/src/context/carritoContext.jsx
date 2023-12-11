import { useState, useEffect, useContext, createContext } from "react";

import {
  RequestRegistrarCarrito,
  RequestVerificarCarrirtoPedido,
  RequestListarVentas,
  RequestListarPedido,
  RequestListarPedidoTicket
} from "../api/carrito.api.js";

import { useNavigate } from "react-router-dom";
import ConfirmModal from "../messages/confirmacion.jsx";
import { Result } from "express-validator";

export const CarritoContext = createContext();

export const useCarrito = () => {
  const context = useContext(CarritoContext);
  if (!context) {
    throw new Error("useCarrito must be used within a CarritoProvider");
  }
  return useContext(CarritoContext);
};

export const CarritoContextProvider = ({ children }) => {
  const Navigate = useNavigate();
  const [carrito, setCarrito] = useState([]);
  const [productosAgregados, setProductosAgregados] = useState([]);
  const [errors, setErrors] = useState([]);
  const [ventas, setVentas] = useState([]);
  

  const registrarCarrito = async (value) => {
    try {
      const result = await RequestRegistrarCarrito(value);
    } catch (error) {
      const response = error.response;
      console.log(response.status);
      console.log(response.data.errors);
      if (response.data.errors !== "El registro ya existe") {
        setErrors(response.data.errors);
      } else {
        setErrors(["El registro ya existe"]);
      }
    }
  };

  const listarVentas = async()=>{

    try {
      const response = await RequestListarVentas();
      setVentas(response.data.data);
      //console.log(response.data.data);
    } catch (error) {
      console.error(error);
    }

  }

  const listarPedido = async(id)=>{
    try {
      const response = await RequestListarPedidoTicket(id);
      setCarrito(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error(error);
  
    }
  }

  const listarPedidoUnico = async(id)=>{
    try {
      const response = await RequestListarPedidoTicket(id);
      // setCarrito(response.data.data);
      console.log(response.data.data);
      return response.data.data;
    
    } catch (error) {
      console.error(error);
  
    }
  }

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        setCarrito,
        setProductosAgregados,
        productosAgregados,
        registrarCarrito,
        listarVentas,
        listarPedido,
        listarPedidoUnico,
        ventas
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
};
