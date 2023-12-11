import { useEffect, useState } from "react";
import { useColor } from "../../context/colorContext.jsx";
import { Link, useLocation } from "react-router-dom";
import { Button, Modal, Box, TextField, IconButton } from "@mui/material";
import CancelIcon from '@mui/icons-material/Cancel';
import {
    Titulo,
    ContenedorForm,
    ContenedorFormWithBoderOneColumn,
    ContenedorSimpleCamposPequeño,
    ButtonDisplayFormBotonera,
    ModalContainer,
    ModalCloseButton,
    Pragraph,
    styleModal
} from "../../css/componentsCss.jsx";


function ColorForm() {

    const { registrarColor, errors, setErrors, listarColor, actualizarColor } = useColor();

    const [open, setOpen] = useState(false);

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = parseInt(searchParams.get('id'));

    const handleClose = () => {
        setOpen(false);
    }

    const [formData, setFormData] = useState({
        referenciaColor: '',
        color: ''
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (id) {
            await actualizarColor(id, formData);
        } else {
            await registrarColor(formData);
        }
    }

    const handleResetForm = () => {
        setFormData({
            referenciaColor: '',
            color: ''
        })
    }


    useEffect(() => {
        if(id){
            const cargarColor = async () => {
                const response = await listarColor(id);
                console.log(response);
                setFormData((prevState)=>({
                    ...prevState,
                    referenciaColor: response.referenciaColor,
                    color: response.color
                    
                }))
            }
            cargarColor();
        }

        if (errors.length > 0) {
            setOpen(true);
        } else {
            handleResetForm();
        }
    }, [errors,listarColor]);


    return (
        <>
            <Titulo>{id ? 'MODIFICAR COLOR' : 'REGISTRAR COLOR'}</Titulo>
            <form onSubmit={handleSubmit}>
                <ContenedorForm>
                    <ContenedorFormWithBoderOneColumn>
                        <ContenedorSimpleCamposPequeño>

                            <TextField name="referenciaColor" label="Referencia" variant="filled" size="small" value={formData.referenciaColor} onChange={handleChange} />

                            <TextField name="color" label="Color" variant="filled" size="small" value={formData.color} onChange={handleChange} />

                        </ContenedorSimpleCamposPequeño>

                        <ButtonDisplayFormBotonera>

                            <Button type='submit' color='success' variant='contained' sx={{ 'fontWeight': 'bold' }}> {id ? "Editar" : "Registrar"}</Button>

                            <Link to={'/colores'}>
                                <Button color='error' variant='outlined' onClick={() => setErrors([])} sx={{ 'fontWeight': 'bold' }}>Cancelar</Button>
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

export default ColorForm;