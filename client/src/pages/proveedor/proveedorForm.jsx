//import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useProveedor } from "../../context/proveedorContext.jsx";
import Button from "@mui/material/Button";
import { Modal, Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import CancelIcon from '@mui/icons-material/Cancel';
import IconButton from "@mui/material/IconButton";

import styled from "@emotion/styled";

const ModalContainer = styled('div')({
  display: "flex",
  flexDirection: "column",
  alignItems: "center"
  
})

const ModalCloseButton = styled('div')({
  display: "flex",
  justifyContent: "flex-end"
})

const Pragraph = styled('p')({
  margin: "5px",
  fontWeight: "bold"
})

const Contenedor = styled('div')({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  alignItems: "center",
})

const ContenedorGlobal = styled('div')({
  display: "grid",
  placeItems: "center",
  gridTemplateColumns: "1fr 1fr",
  gap: "10px",
  border: "1px solid black",
  borderRadius: "10px",
  width: "50%",
  boxShadow: "0 0 6px ",
})

const ContenedorSimple = styled('div')({

  display: "flex",
  flexDirection: "column",
  gap: "10px",
  alignItems: "center",
  padding: "20px",

})

const ContenedorComplejo = styled('div')({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  alignItems: "center",
  padding: "20px",
})

const ButtonDisplay = styled('div')({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  alignItems: "center",
  padding: "10px",

})

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  borderRadius: '20px',
  p:2

};

const Titulo = styled('h1')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: '5px'
})

function ProveedorForm() {

  const location = useLocation();

  const seachParams = new URLSearchParams(location.search);

  const id = parseInt( seachParams.get('id'));

  const exist = id ? true : false;

  const { registrarProveedor, errors, listarProveedor, actualizarProveedor, setErrors } = useProveedor();

  const [open, setOpen] = useState(false);


   
  
  const handleClose = () => {
    setOpen(false);
    setErrors([]);
  
  }

  const handleChange = (e)=>{
    setFormData({
        ...formData,
        [e.target.name]: e.target.value
    })
};

const handleSubmit = async (e)=>{
    e.preventDefault();
    if(id){
        await actualizarProveedor(id, formData);
    }else{
        await registrarProveedor(formData);
    }
    
};


  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    empresa: "",
    direccion: "",
    telefono: "",
    correo: "",
    productos: "",
    pais: "",
  });

 



 

console.log(errors);

  useEffect(() => {

    const cargarProveedor = async () => {
        if(id){
            const proveedor = await listarProveedor(id);
            console.log(proveedor);
            setFormData((prevState) => ({
              ...prevState,
              nombre: proveedor.nombre,
              apellido: proveedor.apellido,
              empresa: proveedor.empresa,
              direccion: proveedor.direccion,
              telefono: proveedor.telefono,
              correo: proveedor.correo,
              productos: proveedor.productos,
              pais: proveedor.pais

            }));
        }
    };

    cargarProveedor();


    // if (errors.length > 0) {
    //   setOpen(true);
     
    // }
    
    

   
  }, [ id, listarProveedor]);
  
useEffect(() => {
  if (errors.length > 0) {
    setOpen(true);
   
  }
}, [errors, setOpen]);


  return (
    <>
      <Titulo>{id?"MODIFICAR PROVEEDOR":"REGISTRAR PROVEEDOR"}</Titulo>
      {/* <Formik
        initialValues={proveedor}
        enableReinitialize={true}
        onSubmit={async (values, actions) => {

           if(id){
            await actualizarProveedor(id,values);
            
            
           }else{
            await registrarProveedor(values);
            actions.resetForm();
            
           }

      }}
      > */}
        {/* {({ handleSubmit, handleChange, values }) => ( */}
          <form onSubmit={handleSubmit}>

            <Contenedor>

              <ContenedorGlobal>
                <ContenedorSimple>



                  <TextField  name="nombre" label="Nombre" variant="filled" size="small"  value={formData.nombre} onChange={handleChange} />


                  <TextField  name="apellido" label="Apellido" variant="filled" size="small" value={formData.apellido} onChange={handleChange} />


                  <TextField  name="empresa" label="Empresa" variant="filled" size="small" value={formData.empresa} onChange={handleChange} />


                  <TextField  name="telefono" label="Telefono" variant="filled" size="small" value={formData.telefono} onChange={handleChange} />

                  <TextField name="correo" label="Correo" variant="filled" size="small" value={formData.correo} onChange={handleChange} />


                  <TextField name="pais" label="Pais" variant="filled" size="small" value={formData.pais} onChange={handleChange} />
                </ContenedorSimple>
                <ContenedorComplejo>

                  <TextField  name="direccion" label="Direccion" variant="filled" multiline rows={4} value={formData.direccion} onChange={handleChange} />

                  <TextField  name="productos" label="Productos" variant="filled" multiline rows={4} value={formData.productos} onChange={handleChange} />

                </ContenedorComplejo>

                <ButtonDisplay>
                  {exist && (<Button type="submit" variant="contained" size="large" onClick={() => setErrors([])} color="success" sx={{ fontWeight: 'bold' }} >Editar</Button>)}
                  {!exist && (<Button type="submit" variant="contained" size="large" onClick={() => setErrors([])}  color="success" sx={{ fontWeight: 'bold' }} >Crear</Button>)}
                  
                </ButtonDisplay>
                <ButtonDisplay>
                  <Link to="/proveedor">
                    <Button variant="outlined" size="large" onClick={() => setErrors([])} color="error" sx={{ fontWeight: 'bold' }}>Cancelar</Button>
                  </Link>
                </ButtonDisplay >


              </ContenedorGlobal>
            </Contenedor>
          </form>
        {/* )} */}
      {/* </form> */}
        
       <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="ERROR"
          
       >
          <Box sx={style}>
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
  );
}

export default ProveedorForm;
