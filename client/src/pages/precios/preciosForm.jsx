import { useEffect, useState } from "react";
import { useProductos } from "../../context/productoContext.jsx";
import { useLocation, Link } from "react-router-dom";
import{
    Button,
    TextField,
    Modal,
    Box,
    IconButton
} from "@mui/material"

import{
    Titulo,
    ContenedorForm,
    ContenedorFormWithBoderOneColumn,
    ContenedorSimpleCamposPequeño,
    ButtonDisplayFormBotonera,
    ModalContainer,
    Pragraph,
    styleModal,
    ModalCloseButton

}from "../../css/componentsCss.jsx"
import CancelIcon from '@mui/icons-material/Cancel';

function PreciosForm() {

    const { listarPrecios, modificarPrecios, errors, setErrors } = useProductos();

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const referencia = searchParams.get('referencia');
    const tamanho = searchParams.get('tamanho');

    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    }

    const [formData, setFormData]=useState({
        precio_compra: '',
        precio_venta_normal: '',
        precio_venta_personalizado: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await modificarPrecios(referencia, tamanho, formData);
    }

    useEffect(() => {
            if(referencia && tamanho){
                const cargarPrecio = async () => {
                    const result = await listarPrecios(referencia, tamanho);
                    setFormData((prevState)=>({
                        ...prevState,
                        precio_compra: result.precio_compra,
                        precio_venta_normal: result.precio_venta_normal,
                        precio_venta_personalizado: result.precio_venta_personalizado
                    }));
                }
                cargarPrecio();
            }

            if(errors.length > 0){
                setOpen(true);
            }

        },[errors]);

  


    return (
        <>
            <Titulo>MODIFICAR PRECIO</Titulo>
            <form onSubmit={handleSubmit}>
            <ContenedorForm>
                <ContenedorFormWithBoderOneColumn>
                    <ContenedorSimpleCamposPequeño>
                        <TextField name="precio_compra" label="PRECIO DE COMPRA" value={formData.precio_compra} onChange={handleChange} />
                        <TextField name="precio_venta_normal" label="PRECIO DE VENTA" value={formData.precio_venta_normal} onChange={handleChange} />
                        <TextField name="precio_venta_personalizado" label="PRECIO PERSONALIZADO" value={formData.precio_venta_personalizado} onChange={handleChange} />    

                    </ContenedorSimpleCamposPequeño>
                    <ButtonDisplayFormBotonera>
                    <Button type="submit" variant="contained" size="large" color="success" sx={{ fontWeight: 'bold' }} >Editar</Button>
                    <Link to="/precios">
                        <Button variant="contained" size="large" color="error" onClick={() => setErrors([])} sx={{ fontWeight: 'bold' }} >Cancelar</Button>
                    </Link>

                    </ButtonDisplayFormBotonera>
                </ContenedorFormWithBoderOneColumn>
            </ContenedorForm>
            </form>


            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="ERROR"

            >
                <Box sx={styleModal}>
                    <ModalCloseButton>
                        <IconButton onClick={handleClose} sx={{ p: 0, background: 'none', border: 'none', '&:hover': { color: 'error.main' } }}>
                            <CancelIcon />
                        </IconButton>
                    </ModalCloseButton>

                    <ModalContainer>
                        <h1>ERROR</h1>
                        {errors.map((error, index) => (
                            <Pragraph key={index}>{error}</Pragraph>
                        ))}
                    </ModalContainer>
                </Box>
            </Modal>
            
            
        </>
    )
}

export default PreciosForm;