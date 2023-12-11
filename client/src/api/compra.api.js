import axios from "axios";

const RequestRegistrarCompra = async (compra) => {
    return await axios.post("http://localhost:3000/registrarCompra", compra);
};

const RequestListarCompras = async () => {
    return await axios.get("http://localhost:3000/listarCompras");
};

const RequestListarCompra = async (id) => {
    return await axios.get(`http://localhost:3000/listarCompra/${id}`);
};

const RequestActualizarCompra = async (id, compra) => {
    return await axios.put(`http://localhost:3000/actualizarCompra/${id}`, compra);
};

export{
    RequestRegistrarCompra,
    RequestListarCompras,
    RequestListarCompra,
    RequestActualizarCompra
}