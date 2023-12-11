import axios from "axios";

const RequestListarPedidos = async () => {
  return await axios.get("http://localhost:3000/listarpedidos");
};

const RequestListarPedido = async (id) => {
  return await axios.get(`http://localhost:3000/listarpedido/${id}`);
};

const RequestRegistrarPedido = async (pedido) => {
  return await axios.post("http://localhost:3000/registrarpedido", pedido);
};

const RequestEstadoFinalizado = async (id) => {
  return await axios.put(`http://localhost:3000/estadoFinalizar/${id}`);
};

const RequestEstadoCompletado = async (id) => {
  return await axios.put(`http://localhost:3000/estadoCompletar/${id}`);
};

const RequestListarPedidosPendientes = async () => {
  return await axios.get("http://localhost:3000/pedidosPendientes");
};
const RequestListarPedidosCompletados = async () => {
  return await axios.get("http://localhost:3000/pedidosCompletados");
};

const RequestListarPedidosFinalizados = async () => {
  return await axios.get("http://localhost:3000/pedidosFinalizados");
};

const RequestActualizarPedido = async (id, pedido) => {
  return await axios.put(`http://localhost:3000/actualizarpedido/${id}`, pedido);
};

const RequestEliminarPedido = async (id) => {
  return await axios.put(`http://localhost:3000/eliminarpedido/${id}`);
};

export {
  RequestListarPedidos,
  RequestListarPedido,
  RequestRegistrarPedido,
  RequestEstadoCompletado,
  RequestEstadoFinalizado,
  RequestListarPedidosCompletados,
  RequestListarPedidosFinalizados,
  RequestListarPedidosPendientes,
  RequestActualizarPedido,
  RequestEliminarPedido
};
