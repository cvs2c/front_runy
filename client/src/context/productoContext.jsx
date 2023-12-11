import {
    RequestListarProductos,
    RequestRegistrarProducto,
    RequestActualizarProducto,
    RequestListarProducto,
    RequestEliminarProducto,
    RequestListarPrecios,
    RequestModificarPrecios,
    RequestListarProductosStock
} from "../api/producto.api.js"

import { createContext, useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import ConfirmModal from "../messages/confirmacion.jsx";


export const ProductoContext = createContext();

export const useProductos = () => {
    const context = useContext(ProductoContext);
    if (!context) {
        throw new Error('useProductos must be used within a ProductoProvider');
    }
    return useContext(ProductoContext);
}

export const ProductoContextProvider = ({ children }) => {

    const navigate = useNavigate();
    const [productos, setProductos] = useState([]);
    const [productosStock, setProductosStock] = useState([]);
    const [errors, setErrors] = useState([]);
    const [valorEliminado, setValorEliminado] = useState(false);
    const [modalAbrir, setModalAbrir] = useState(false);

    const listarProductos = async () => {
        try {
            const result = await RequestListarProductos();
            setProductos(result.data.data);
            console.log(result.data.data);
        } catch (error) {
            console.error(error);
        }
    }

    const listarProductosStock = async  () =>{
        try {
            const result = await RequestListarProductosStock();
            setProductosStock(result.data.data);
            console.log(result.data.data);
        } catch (error) {
            console.error(error);
        }
    }

    const registrarProducto = async (producto) => {
        try {
            const result = await RequestRegistrarProducto(producto);
            setErrors([]);

            setModalAbrir(true);

            setTimeout(() => {
                setModalAbrir(false);
            }, 1000);

            console.log(result.data.data);
        } catch (error) {
            console.log(error);
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

    const listarProducto = async (id) => {
        try {
            const result = await RequestListarProducto(id);
            console.log(result.data);
            return result.data.data;
        } catch (error) {
            console.error(error);
        }
    }

    const listarPrecios = async (referencia, tamanho) => {
        try {
            const result = await RequestListarPrecios(referencia, tamanho);
            console.log(result.data.data);
            return result.data.data;
        } catch (error) {
            console.error(error);
        }
    }

    const actualizarProducto = async (id, producto) => {
        try {
            const result = await RequestActualizarProducto(id, producto);

            setModalAbrir(true);

            setTimeout(() => {
                setModalAbrir(false);
            }, 1000);


            console.log(result.data.data);
            navigate('/productos');
        } catch (error) {
            console.log(error);
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

    const modificarPrecios = async (referencia, tamanho, precio) => {
        try {
            const result = await RequestModificarPrecios(referencia, tamanho, precio);

            setModalAbrir(true);

            setTimeout(() => {
                setModalAbrir(false);
            }, 1000);


            navigate('/precios');
        } catch (error) {
            console.log(error);
            const response = error.response;
            console.log(response.status);
            console.log(response.data.errors);
            setErrors(response.data.errors);

        }
    }

    const eliminarProducto = async (id) => {
        try {
            const result = await RequestEliminarProducto(id);
            setValorEliminado(true);
        } catch (error) {
            console.log(error);

        }
    }



    return (
        <ProductoContext.Provider value={{
            listarProductos,
            productos,
            registrarProducto,
            errors,
            setErrors,
            listarProducto,
            actualizarProducto,
            eliminarProducto,
            valorEliminado,
            setValorEliminado,
            listarPrecios,
            modificarPrecios,
            listarProductosStock,
            productosStock,
            setProductosStock
        }}>
            <ConfirmModal
                isOpen={modalAbrir}
                onRequestClose={() => setModalAbrir(false)}

            />
            {children}</ProductoContext.Provider>
    )
}