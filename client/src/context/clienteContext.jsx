import { createContext, useState, useContext } from 'react';
import {
    RequestListarClientes,
    RequestListarCliente,
    RequestRegistrarCliente,
    RequestActualizarCliente
} from '../api/clientes.api.js';
import { useNavigate } from 'react-router-dom';
import ConfirmModal from '../messages/confirmacion.jsx';

export const ClienteContext = createContext();

export const useCliente = () => {
    const context = useContext(ClienteContext);
    if (!context) {
        throw new Error('useCliente must be used within a ClienteProvider');
    }
    return useContext(ClienteContext);
}

export const ClienteContextProvider = ({ children }) => {

    const navigate = useNavigate();

    const [clientes, setClientes] = useState([]);
    const [errors, setErrors] = useState([]);
    const [modalAbrir, setModalAbrir] = useState(false);


    const listarClientes = async () => {
        try {
            const response = await RequestListarClientes();
            setClientes(response.data.data);
        } catch (error) {
            console.log(error);
        }
    }

    const registrarCliente = async (cliente) => {
        try {
            const response = await RequestRegistrarCliente(cliente);
            setErrors([]);

            setModalAbrir(true);

            setTimeout(() => {
                setModalAbrir(false);
            }, 1000);

            console.log(response.data.data);
        } catch (error) {
            const response = error.response;
            console.log(response.status);
            console.log(response.data.errors);
            if (response.data.errors && response.data.errors !== 'El cliente ya existe') {
                setErrors(response.data.errors);
            } else if (response.data.errors === 'El cliente ya existe') {
                setErrors(['El cliente ya existe']);
            } else {
                setErrors([]);
            }

        }
    }

    const listarCliente = async (id) => {
        try {
            const response = await RequestListarCliente(id);
            console.log(response.data.data);
            return response.data.data;
        } catch (error) {
            console.error(error);
        }
    };

    const actualizarCliente = async (id, cliente) => {
        try {
            const response = await RequestActualizarCliente(id, cliente);

            setModalAbrir(true);

            setTimeout(() => {
                setModalAbrir(false);
            }, 1000);

            navigate('/clientes');
        } catch (error) {
            const response = error.response;
            console.log(response.status);
            console.log(response.data.errors);
            if (response.data.errors && response.data.errors !== 'El cliente ya existe') {
                setErrors(response.data.errors);
            } else if (response.data.errors === 'El cliente ya existe') {
                setErrors(['El cliente ya existe']);
            } else {
                setErrors([]);
            }
        }
    }


    return (
        <ClienteContext.Provider value={{
            clientes,
            listarClientes,
            registrarCliente,
            listarCliente,
            actualizarCliente,
            setErrors,
            errors
        }}>

            <ConfirmModal
                isOpen={modalAbrir}
                onRequestClose={() => setModalAbrir(false)}

            />

            {children}
        </ClienteContext.Provider>
    )
}
