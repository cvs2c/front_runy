import { createContext, useState, useContext } from "react";
import {
  RequestListarPedidos,
  RequestRegistrarPedido,
  RequestListarPedido,
  RequestEstadoCompletado,
  RequestEstadoFinalizado,
  RequestListarPedidosCompletados,
  RequestListarPedidosFinalizados,
  RequestListarPedidosPendientes,
  RequestActualizarPedido,
  RequestEliminarPedido
} from "../api/pedidos.api.js";

import { useNavigate } from "react-router-dom";
import ConfirmModal from '../messages/confirmacion.jsx';

export const PedidoContext = createContext();
export const usePedidos = () => {
  const context = useContext(PedidoContext);
  if (!context) {
    throw new Error("usePedidos must be used within a PedidoProvider");
  }
  return useContext(PedidoContext);
};

export const PedidoContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [pedidos, setPedidos] = useState([]);
  const [errors, setErrors] = useState([]);
  const [variableCambio, setVariableCambio] = useState([0]);
  const [modalAbrir, setModalAbrir] = useState(false);

  //ListarPedidos
  const listarPedidos = async () => {
    try {
      const result = await RequestListarPedidos();
      setPedidos(result.data.data);
      console.log(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const listarPedidosPendientes = async () => {
    try {
      const result = await RequestListarPedidosPendientes();
      setPedidos(result.data.data);
      console.log(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const listarPedidosFinalizados = async () => {
    try {
      const result = await RequestListarPedidosFinalizados();
      setPedidos(result.data.data);
      console.log(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const eliminarPedido = async (id) => {
    try {
      const result = await RequestEliminarPedido(id);
    } catch (error) {
      console.log(error);
    }
  };

  const listarPedidoCompletados = async () => {
    try {
      const result = await RequestListarPedidosCompletados();
      setPedidos(result.data.data);
      console.log(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const listarPedido = async (id) => {
    try {
      const result = await RequestListarPedido(id);
      console.log(result.data.data);
      return result.data.data;
    } catch (error) {
      console.error(error);
    }
  };

  //RegistrarPedido
  const registrarPedido = async (pedido) => {
    try {
      const result = await RequestRegistrarPedido(pedido);

      setErrors([]);

      setModalAbrir(true);

            setTimeout(() => {
                setModalAbrir(false);
            }, 1000);


      console.log(result.data.data);

    } catch (error) {
      const response = error.response;
      console.log(response.status);
      console.log(response.data.errors);
      if (response.data.errors !== 'El registro ya existe') {
        setErrors(response.data.errors);
      } else {
        setErrors(['El registro ya existe']);
      }
    }
  };

  const actualizarPedido = async (id, pedido) => {
    try {
      const result = await RequestActualizarPedido(id, pedido);
      console.log(result.data.data);
      setModalAbrir(true);

            setTimeout(() => {
                setModalAbrir(false);
            }, 1000);

      navigate('/pedidos');
    } catch (error) {
      console.log(error);
      const response = error.response;
      console.log(response.status);
      console.log(response.data.errors);
      if (response.data.errors ) {
        setErrors(response.data.errors);
      } 
    }
  };

  const finalizado = async (id) => {
    try {
      const result = await RequestEstadoFinalizado(id);
    } catch (error) {
      console.log(error);
    }
  };

  const completado = async (id) => {
    try {
      const result = await RequestEstadoCompletado(id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PedidoContext.Provider
      value={{
        listarPedidos,
        pedidos,
        registrarPedido,
        errors,
        setErrors,
        completado,
        finalizado,
        listarPedidosPendientes,
        listarPedidosFinalizados,
        listarPedidoCompletados,
        variableCambio,
        setVariableCambio,
        actualizarPedido,
        listarPedido,
        eliminarPedido
      }}
    >
      <ConfirmModal
                isOpen={modalAbrir}
                onRequestClose={() => setModalAbrir(false)}

            />
      {children}
    </PedidoContext.Provider>
  );
};
