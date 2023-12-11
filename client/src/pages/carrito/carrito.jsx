import { useProductos } from "../../context/productoContext.jsx";
import { useCarrito } from "../../context/carritoContext.jsx";
import { useState, useEffect, useDebugValue } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
    Button,
    TextField,
    Modal,
    Box,
    IconButton,
    Autocomplete,
    InputLabel,
    FormControl,
    Select,
    MenuItem,
    Grid,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import {
    Titulo,
    ModalCloseButton,
    ModalContainer,
    Pragraph,
    styleModal,
    ContenedorForm,
    ContenedorGlobalFormDosColumnas,
    ContenedorSimpleCamposPequeño,
    ContenedorComplejoCamposAmplios,
    ContenedorFormWithBoderOneColumn,
    ButtonDisplayFormBotonera,
    CarritoPrincipal,
    Columna1,
    Columna2
} from "../../css/componentsCss.jsx";




function Carrito() {

    const { listarProductos, productos } = useProductos();
   // const { carrito, setCarrito } = useCarrito();
    
    const Navigate = useNavigate();

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    //El id es de tipo number
    const id = parseInt(searchParams.get("id"));

    const [formData, setFormData] = useState({

    });




    const [selectedProducto, setSelectedProducto] = useState(null);
    const ProductoChange = (e, value) => {
        setSelectedProducto(value);
        // const productoIdValue = value.id;
        //setFormData({
        //   ...formData,
        //  productoId: productoIdValue
        // })
    };

    const [carritoProvisorio, setCarritoProvisorio] = useState([]);

    const insertInCarrito = (value) => {
        setCarritoProvisorio((prevCarrito) => [...prevCarrito, value]);
    };

    useEffect(() => {
        listarProductos();
        console.log(carritoProvisorio);

    }, [carritoProvisorio]);

    


    return (
        <>
            <Titulo>Carrito</Titulo>


            <ButtonDisplayFormBotonera>

               
                <Button variant="outlined" color="primary" onClick={() => {

                    Navigate(`/cargarCarrito?id=${id}`);

                }}  >
                    Cargar
                </Button>


            </ButtonDisplayFormBotonera>


        </>
    )
}

export default Carrito;
