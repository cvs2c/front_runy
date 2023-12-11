import { useState, useEffect } from "react";
import { useCliente } from "../../context/clienteContext.jsx";
import { usePedidos } from "../../context/pedidoContext.jsx";
import { Link, useLocation } from "react-router-dom";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
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

function PedidoForm() {
  const { registrarPedido, errors, setErrors, actualizarPedido, listarPedido } =
    usePedidos();
  const { clientes, listarClientes, listarCliente } = useCliente();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = parseInt(searchParams.get("id"));

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const [formData, setFormData] = useState({
    clienteId: "",
    fecha_entrega: "",
  });

  const [selectedClienteId, setSelectedClienteId] = useState(null);

  const [fechaFormateada, setFechaFormateada] = useState("");

  const ClienteChange = (e, value) => {
    setSelectedClienteId(value);
    const clienteIdValue = value.id;
    setFormData({
      ...formData,
      clienteId: clienteIdValue,
    });
  };

  // const [selectedDate, setSelectedDate] = useState("");

  // const handleDateChange = (date) => {
  //   setSelectedDate(date);
  //   const formattedDate = format(date, "MM/dd/yyyy");
  //   setFormData({
  //     ...formData,
  //     fecha_entrega: formattedDate,
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
      clienteId: "",
      fecha_entrega: "",
    });
    setSelectedClienteId(null);
  };

  useEffect(() => {
    listarClientes();

    if (errors.length > 0) {
      setOpen(true);
    } else {
      handleResetForm();
    }
  }, [errors]);

  useEffect(() => {
    if (id) {
      const cargarPedido = async () => {
        const response = await listarPedido(id);
        setFormData((prevstate) => ({
          ...prevstate,
          clienteId: response.clienteId,
          fecha_entrega: response.fecha_entrega,
        }));
        const responsecliente = await listarCliente(response.clienteId);
        setSelectedClienteId(responsecliente);
      };

      cargarPedido();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await actualizarPedido(id, formData);
    } else {
      await registrarPedido(formData);
    }
  };

  return (
    <>
      <Titulo>{id ? "MODIFICAR PEDIDO" : "REGISTRAR PEDIDO"}</Titulo>
      <form onSubmit={handleSubmit}>
        <ContenedorForm>
          <ContenedorFormWithBoderOneColumn>
            <ContenedorSimpleCamposPequeño>
              <Autocomplete
                id="cliente-autocomplete"
                name="clienteId"
                onChange={ClienteChange}
                options={clientes}
                getOptionLabel={(option) =>
                  option.nombre + " " + option.apellido + " " + option.ci
                }
                value={selectedClienteId}
                style={{ width: 230 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Cliente"
                    variant="filled"
                    value={formData.clienteId}
                  />
                )}
              />

              {/* <DatePicker selected={selectedDate} onChange={handleDateChange} minDate={new Date()} /> */}

              <TextField
                type="date"
                name="fecha_entrega"
                
                variant="filled"
                value={formData.fecha_entrega}
                onChange={handleChange}
                style={{ width: 230 }}
              />
            </ContenedorSimpleCamposPequeño>
            <ButtonDisplayFormBotonera>
              <Button
                type="submit"
                variant="contained"
                size="large"
                color="success"
                sx={{ fontWeight: "bold" }}
              >
                {id ? "Editar" : "Crear"}
              </Button>

              <Link to="/pedidos">
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

export default PedidoForm;
