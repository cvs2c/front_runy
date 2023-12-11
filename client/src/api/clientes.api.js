import axios from "axios";

const RequestListarClientes = async () => {
    return await axios.get("http://localhost:3000/listarClientes");
};

const RequestListarCliente = async(id) => {
    return await axios.get(`http://localhost:3000/listarCliente/${id}`);
};

const RequestRegistrarCliente = async (cliente) => {
    return await axios.post("http://localhost:3000/registrarCliente", cliente);
};

const RequestActualizarCliente = async (id, cliente) => {
    return await axios.put(`http://localhost:3000/actualizarCliente/${id}`, cliente);
};

export{
    RequestRegistrarCliente,
    RequestListarClientes,
    RequestListarCliente,
    RequestActualizarCliente
}