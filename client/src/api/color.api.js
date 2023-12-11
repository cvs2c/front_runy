import axios from 'axios';

 const RequestListarColores = async () => {
    return await axios.get("http://localhost:3000/listarColores");
}

 const RequestListarColor = async (id) => {
    return await axios.get(`http://localhost:3000/listarColor/${id}`);
}

 const RequestRegistrarColor = async (color) => {
    return await axios.post("http://localhost:3000/registrarColor", color);
}

const RequestActualizarColor = async (id, color) => {
    return await axios.put(`http://localhost:3000/actualizarColor/${id}`, color);
}

 const RequestEliminarColor = async (id) => {
    return await axios.patch(`http://localhost:3000/eliminarColor/${id}`);
}

export{
    RequestListarColores,
    RequestListarColor,
    RequestRegistrarColor,
    RequestActualizarColor,
    RequestEliminarColor
}