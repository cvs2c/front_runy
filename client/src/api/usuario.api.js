import axios from 'axios';


axios.defaults.withCredentials = true;

export const RequestCrearSession = async (usuario) => {
    return await axios.post('http://localhost:3000/login', usuario);
}

export const RequestCerrarSesion = async () => {
    return await axios.get('http://localhost:3000/logout');
}