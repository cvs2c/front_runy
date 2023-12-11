import { useState, useEffect } from "react";
// import { useState, useEffect } from "react";
// import { useCliente } from "../../context/clienteContext.jsx";
import { useCompras } from "../../context/compraContext.jsx";
// import { usePedidos } from "../../context/pedidoContext.jsx";
import { useProveedor } from "../../context/proveedorContext.jsx";
import { Link, useLocation } from "react-router-dom";
import DatePicker from "react-datepicker";
import { format, parseISO } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";

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
} from "../../css/componentsCss.jsx";

function ComprasForm() {
  const { registrarCompra, errors, setErrors, actualizarCompra, listarCompra } =
    useCompras();

  const { proveedores, listarProveedores, listarProveedor } = useProveedor();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = parseInt(searchParams.get("id"));

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const [formData, setFormData] = useState({
    proveedorId: "",
    monto: "",
    fecha: "",
  });

  const [selectedProveedorId, setSelectedProveedorId] = useState(null);

  const [fechaFormateada, setFechaFormateada] = useState("");

  const ProveedorChange = (e, value) => {
    setSelectedProveedorId(value);
    const proveedorIdValue = value.id;
    setFormData({
      ...formData,
      proveedorId: proveedorIdValue,
    });
  };

  // const [selectedDate, setSelectedDate] = useState('');

  // const handleDateChange = (date) => {
  //   setSelectedDate(date);

  //   const formattedDate = format(date, 'MM/dd/yyyy');
  //   setFormData({
  //     ...formData,
  //     fecha: formattedDate
  //   });
  // };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleResetForm = () => {
    setFormData({
      monto: "",
      fecha: "",
    });
    setSelectedProveedorId(null);
  };

  useEffect(() => {
    listarProveedores();

    if (errors.length > 0) {
      setOpen(true);
    } else {
      handleResetForm();
      // setSelectedDate('');
    }
  }, [errors]);

  // useEffect(() => {
  //   console.log(selectedDate);
  // }, [selectedDate]);

  useEffect(() => {
    if (id) {
      const cargarCompra = async () => {
        const response = await listarCompra(id);
        setFormData((prevstate) => ({
          ...prevstate,
          proveedorId: response.proveedorId,
          monto: response.monto,
          fecha: response.fecha,
        }));
        const responseproveedor = await listarProveedor(response.proveedorId);
        setSelectedProveedorId(responseproveedor);
      };

      cargarCompra();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!id) {
      await registrarCompra(formData);
    } else {
      await actualizarCompra(id, formData);
    }
  };

  return (
    <>
      <Titulo>{id ? "MODIFICAR COMPRA" : "REGISTRAR COMPRA"}</Titulo>
      <form onSubmit={handleSubmit}>
        <ContenedorForm>
          <ContenedorFormWithBoderOneColumn>
            <ContenedorSimpleCamposPequeño>
              <Autocomplete
                id="proveedor-autocomplete"
                name="proveedorId"
                onChange={ProveedorChange}
                options={proveedores}
                getOptionLabel={(option) =>
                  option.nombre + " " + option.apellido
                }
                value={selectedProveedorId}
                style={{ width: 230 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Proveedor"
                    variant="filled"
                    value={formData.proveedorId}
                  />
                )}
              />
              <TextField
                type="text"
                name="monto"
                label="Monto"
                variant="filled"
                style={{ width: 230 }}
                value={formData.monto}
                onChange={handleChange}
              />
              <TextField
                type="date"
                name="fecha"
                variant="filled"
                style={{ width: 230 }}
                value={formData.fecha}
                onChange={handleChange}
              />

              {/* <DatePicker selected={selectedDate} onChange={handleDateChange} dateFormat={"MM/dd/yyyy"}/> */}
            </ContenedorSimpleCamposPequeño>
            <ButtonDisplayFormBotonera>
              <Button
                type="submit"
                variant="contained"
                size="large"
                color="success"
                sx={{ fontWeight: "bold" }}
              >
                {id?"Editar":"Registrar"}
              </Button>

              <Link to="/compras">
                <Button
                  variant="outlined"
                  size="large"
                  color="error"
                  onClick={() => setErrors([])}
                  sx={{ fontWeight: "bold" }}
                >
                  Cancelar
                </Button>
              </Link>
            </ButtonDisplayFormBotonera>
          </ContenedorFormWithBoderOneColumn>
        </ContenedorForm>
      </form>

      <Modal open={open} onClose={handleClose} aria-labelledby="ERROR">
        <Box sx={styleModal}>
          <ModalCloseButton>
            <IconButton
              onClick={handleClose}
              sx={{
                p: 0,
                background: "none",
                border: "none",
                "&:hover": { color: "error.main" },
              }}
            >
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
  );
}

export default ComprasForm;
