import axios from "axios";

const RequestRegistrarCarrito = async (carrito) => {
    return await axios.post("http://localhost:3000/registrarPedidoProducto", carrito);
};

const RequestVerificarCarrirtoPedido = async (carrito) => {
    return await axios.post("http://localhost:3000/verificarCantidadPedido", carrito);
};

const RequestListarVentas = async () => {
    return await axios.get("http://localhost:3000/listarProductosVentas");
};

const RequestListarPedido = async (id) => {
    return await axios.get(`http://localhost:3000/listarPedido/${id}`);
};

const RequestListarPedidoTicket = async(id) =>{
    return await axios.get(`http://localhost:3000/listarPedidoTicket/${id}`);
};


export {
    RequestRegistrarCarrito,
    RequestVerificarCarrirtoPedido,
    RequestListarVentas,
    RequestListarPedido,
    RequestListarPedidoTicket
}