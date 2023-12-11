import axios from "axios";

const RequestRegistrarProveedor = async (proveedor) => {
    return await axios.post("http://localhost:3000/registrarProveedor", proveedor);
}

const RequestListarProveedores = async () => {
    return await axios.get("http://localhost:3000/listarProveedores");
}

const RequestListarProveedor = async (id) => {
    return await axios.get(`http://localhost:3000/listarProveedor/${id}`);
}

const RequestActualizarProveedor = async (id, proveedor) => {
    return await axios.put(`http://localhost:3000/actualizarProveedor/${id}`, proveedor);
}

const RequestEliminarProveedor = async (id) => {
    return await axios.patch(`http://localhost:3000/eliminarProveedor/${id}`);
}

export{
    RequestRegistrarProveedor,
    RequestListarProveedores,
    RequestListarProveedor,
    RequestActualizarProveedor,
    RequestEliminarProveedor
}