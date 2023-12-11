import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    RequestListarColores,
    RequestRegistrarColor,
    RequestActualizarColor,
    RequestEliminarColor,
    RequestListarColor
} from "../api/color.api.js";

import ConfirmModal from "../messages/confirmacion.jsx";


export const ColorContext = createContext();

export const useColor = () => {
    const context = useContext(ColorContext);
    if (!context) {
        throw new Error('useColor must be used within a ColorProvider');
    }
    return useContext(ColorContext);
}

export const ColorContextProvider = ({ children }) => {
    const navigate = useNavigate();

    const [colores, setColores] = useState([]);
    const [errors, setErrors] = useState([]);
    const [valorEliminado, setValorEliminado] = useState(false);
    const [modalAbrir, setModalAbrir] = useState(false);

    const listarColores = async () => {
        try {
            const resutl = await RequestListarColores();
            setColores(resutl.data.data);
        } catch (error) {
            console.log(error);
        }
    }

    const registrarColor = async (color) => {
        try {

            const result = await RequestRegistrarColor(color);
            setErrors([]);

            setModalAbrir(true);

            setTimeout(() => {
                setModalAbrir(false);
            }, 1000);


        } catch (error) {
            const response = error.response;
            console.log(response.status);
            console.log(response.data.errors);
            if (response.data.errors !== 'El registro ya existe') {
                setErrors(response.data.errors);
            } else {
                setErrors(['El registro ya existe']);
            }
        }
    }

    const listarColor = async (id) => {
        try {
            const result = await RequestListarColor(id);
            console.log(result);
            return result.data.data;
        } catch (error) {
            console.log(error);
        }
    }

    const actualizarColor = async (id, color) => {
        try {
            const result = await RequestActualizarColor(id, color);
            console.log(result.data.data);

            setModalAbrir(true);

            setTimeout(() => {
                setModalAbrir(false);
            }, 1000);
            navigate('/colores');
        } catch (error) {
            const response = error.response;
            console.log(response.status);
            console.log(response.data.errors);
            if (response.data.errors !== 'El registro ya existe') {
                setErrors(response.data.errors);
            } else {
                setErrors(['El registro ya existe']);
            }
        }
    }

    const eliminarColor = async (id) => {
        try {
            const result = await RequestEliminarColor(id);
            setValorEliminado(true);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <ColorContext.Provider value={{
            colores,
            listarColores,
            registrarColor,
            errors,
            setErrors,
            listarColor,
            actualizarColor,
            eliminarColor,
            valorEliminado,
            setValorEliminado
        }}>
            <ConfirmModal
                isOpen={modalAbrir}
                onRequestClose={() => setModalAbrir(false)}

            />
            {children}
        </ColorContext.Provider>
    )
}