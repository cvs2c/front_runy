import {useState, useEffect} from 'react';
import { useCliente } from '../../context/clienteContext.jsx';
import { Link, useLocation } from 'react-router-dom';
import Button from "@mui/material/Button";
import { Modal, Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import CancelIcon from '@mui/icons-material/Cancel';
import IconButton from "@mui/material/IconButton";
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

} from '../../css/componentsCss.jsx';

function ClientesForm(){

    const { registrarCliente, errors, setErrors, listarCliente, actualizarCliente } = useCliente();
    
    const [open, setOpen] = useState(false);

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = parseInt( searchParams.get('id'));

    const handleClose = () => {
        setOpen(false);
    }

    const [formData, setFormData] = useState({
        nombre:'',
        apellido:'',
        ci:'',
        ruc:'',
        telefono:'',
        correo:''
    });

    const handleChange = (e)=>{
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    };

    const handleSubmit = async (e)=>{
        e.preventDefault();
        if(id){
            await actualizarCliente(id, formData);
        }else{
            await registrarCliente(formData);
        }
        
    };

    const handleResetForm = () => {
        setFormData({
            nombre:'',
            apellido:'',
            ci:'',
            ruc:'',
            telefono:'',
            correo:''
        });
    }


    useEffect(() => {
        if(id){
            const cargarCliente = async () => {
                const response = await listarCliente(id);
                console.log(response);
                setFormData((prevState)=> ({
                    ...prevState,
                    nombre: response.nombre,
                    apellido: response.apellido,
                    ci: response.ci,
                    ruc: response.ruc,
                    telefono: response.telefono,
                    correo: response.correo
                    
                }))
            }
            cargarCliente();
        }

        if (errors.length > 0) {
            setOpen(true);
        }else{
            handleResetForm();
        }
    }, [errors, id, listarCliente]);

    console.log(errors);

    return(
        <>
            <Titulo>{id? "MODIFICAR CLIENTE" : "REGISTRAR CLIENTE"}</Titulo>
            <form onSubmit={handleSubmit}>
                <ContenedorForm>
                <ContenedorFormWithBoderOneColumn>
                    <ContenedorSimpleCamposPequeño>

                        <TextField name='nombre' label='Nombre' variant='filled' size='small' value={formData.nombre} onChange={handleChange} />

                        <TextField name='apellido' label='Apellido' variant='filled' size='small' value={formData.apellido} onChange={handleChange} />

                        <TextField name='ci' label='C.I.' variant='filled' size='small' value={formData.ci} onChange={handleChange} />

                        <TextField name='ruc' label='RUC' variant='filled' size='small' value={formData.ruc} onChange={handleChange} />

                        <TextField name='telefono' label='Telefono' variant='filled' size='small' value={formData.telefono} onChange={handleChange} />

                        <TextField name='correo' label='Correo' variant='filled' size='small' value={formData.correo} onChange={handleChange} />

                    </ContenedorSimpleCamposPequeño>
                    <ButtonDisplayFormBotonera>

                        <Button type='submit' color='success' variant='contained' sx={{'fontWeight':'bold'}}> {id? "Editar" : "Registrar"}</Button>

                        <Link to={'/clientes'}>
                            <Button color='error' variant='outlined' onClick={()=>setErrors([])} sx={{'fontWeight':'bold'}}>Cancelar</Button>
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
              <IconButton onClick={handleClose} sx={{p:0, background:'none', border:'none', '&:hover': { color: 'error.main' }}}>
                <CancelIcon  />
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

export default ClientesForm;