import { createContext, useContext, useState } from "react";
import {
    RequestRegistrarProveedor,
    RequestListarProveedores,
    RequestListarProveedor,
    RequestActualizarProveedor,
    RequestEliminarProveedor
} from '../api/proveedor.api.js';

import { useNavigate } from "react-router-dom";
import ConfirmModal from "../messages/confirmacion.jsx";

export const ProveedorContext = createContext();

export const useProveedor = () => {
    const context = useContext(ProveedorContext);
    if (!context) {
        throw new Error('useProveedor must be used within a ProveedorProvider');
    }
    return useContext(ProveedorContext);
}

export const ProveedorContextProvider = ({ children }) => {

    const navigate = useNavigate();

    const [proveedores, setProveedores] = useState([]);
    const [errors, setErrors] = useState([]);
    const [valorEliminado, setValorEliminado] = useState(false);
    const [modalAbrir, setModalAbrir] = useState(false);


    const listarProveedores = async () => {
        try {
            const response = await RequestListarProveedores();
            setProveedores(response.data.data);
            console.log(response.data.data);

        } catch (error) {
            console.error(error);
        }
    }

    const registrarProveedor = async (proveedor) => {
        try {
            const response = await RequestRegistrarProveedor(proveedor);
            setModalAbrir(true);

            setTimeout(() => {
                setModalAbrir(false);
            }, 1000);


        } catch (error) {
            const response = error.response
            console.log(response.status);
            console.log(response.data.errors);
            if (response.data.errors && response.data.errors !== 'El proveedor ya existe') {
                setErrors(response.data.errors);
            } else if (response.data.errors === 'El proveedor ya existe') {
                setErrors(['El proveedor ya existe']);
            } else {
                setErrors([]);
            }
        }
    };

    const listarProveedor = async (id) => {
        try {
            const response = await RequestListarProveedor(id);
            console.log(response.data.data);
            return response.data.data;
        } catch (error) {
            console.error(error);
        }
    };

    const actualizarProveedor = async (id, proveedor) => {
        try {
            const response = await RequestActualizarProveedor(id, proveedor);
            
            setModalAbrir(true);

            setTimeout(() => {
                setModalAbrir(false);
            }, 1000);
            navigate("/proveedor");

        } catch (error) {
            const response = error.response
            console.log(response.status);
            console.log(response.data.errors);
            if (response.data.errors && response.data.errors !== 'El proveedor ya existe') {
                setErrors(response.data.errors);
            } else if (response.data.errors === 'El proveedor ya existe') {
                setErrors(['El proveedor ya existe']);
            } else {
                setErrors([]);
            }
        }

    };

    const eliminarProveedor = async (id) => {
        try {
            const response = await RequestEliminarProveedor(id);
            setValorEliminado(true);
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <ProveedorContext.Provider value={
            {
                proveedores,
                errors,
                listarProveedores,
                listarProveedor,
                registrarProveedor,
                actualizarProveedor,
                eliminarProveedor,
                valorEliminado,
                setValorEliminado,
                setProveedores,
                setErrors
            }
        }>
            <ConfirmModal
                isOpen={modalAbrir}
                onRequestClose={() => setModalAbrir(false)}
               
            />
            {children}
        </ProveedorContext.Provider>
    )

}