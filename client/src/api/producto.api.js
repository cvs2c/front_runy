import axios from "axios";

const RequestListarProductos = async () => {
    return await axios.get("http://localhost:3000/listarProductos");
}

const RequestListarProducto = async (id) => {
    return await axios.get(`http://localhost:3000/listarProducto/${id}`);
}

const RequestRegistrarProducto = async(producto) => {
    return await axios.post("http://localhost:3000/registrarProducto", producto);
}

const RequestActualizarProducto = async(id, producto)=>{
    return await axios.put(`http://localhost:3000/actualizarProducto/${id}`, producto);
}

const RequestEliminarProducto = async(id)=>{
    return await axios.patch(`http://localhost:3000/eliminarProducto/${id}`);
}

const RequestModificarPrecios = async(referencia, tamanho, precio)=>{
    return await axios.put(`http://localhost:3000/modificarPrecios/${referencia}/${tamanho}`, precio);
}

const RequestListarPrecios = async(referencia, tamanho)=>{
    return await axios.get(`http://localhost:3000/listarProductosPorPrecio/${referencia}/${tamanho}`);
}

const RequestListarProductosStock = async () => {
    return await axios.get("http://localhost:3000/listarProductosConStock");
}

export{
    RequestListarProductos,
    RequestListarProducto,
    RequestRegistrarProducto,
    RequestActualizarProducto,
    RequestEliminarProducto,
    RequestModificarPrecios,
    RequestListarPrecios,
    RequestListarProductosStock
}