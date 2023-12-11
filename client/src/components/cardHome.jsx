import { useNavigate } from "react-router-dom";
import { usePedidos } from "../context/pedidoContext.jsx";
import { useCarrito } from "../context/carritoContext.jsx";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import PedidoEspecifico from "../components/pedidoEspecifico.jsx";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  Modal,
  Box,
} from "@mui/material";
import AddCircleRounded from "@mui/icons-material/AddCircleRounded";
import CancelIcon from "@mui/icons-material/Cancel";
import {
  Espaciado,
  FullMessage,
  JustMessage,
  MessageButton,
  styleModal,
  ModalCloseButton,
} from "../css/componentsCss.jsx";

const columns = [
  { id: "nombre", label: "Nombre", align: "center", minWidth: 120 },
  { id: "apellido", label: "Apellido", align: "center", minWidth: 120 },
  { id: "total", label: "Total", align: "center", minWidth: 120 },
  { id: "estado", label: "Estado", align: "center", minWidth: 120 },
  { id: "fecha", label: "Entrega", align: "center", minWidth: 120 },
  { id: "acciones", label: "Acciones", align: "center", minWidth: 120 }
];

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 700,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    borderRadius: "20px",
  };


  const fortamtearFecha = (dateValue) =>{

    const [año, mes, dia] = dateValue.split('-');
    const fechaFormateada = `${dia}/${mes}/${año}`;

    return fechaFormateada
  }

function CardHome({ pedidos }) {
  const { carrito, setCarrito, listarPedidoUnico } = useCarrito();
  const { finalizado, completado, variableCambio, setVariableCambio } =
    usePedidos();

  const Navigate = useNavigate();

  const [deleteValue, setDeleteValue] = useState(0);
  const [confirmar, setConfirmar] = useState(false);
  const [open, setOpen] = useState(false);
  const [idValue, setIdValue] = useState(0);
  const [moreData, setMoreData] = useState([]);

  const handleExpandirInfo = (id) => {
    setIdValue(id);
  };


  const handleCarrito = (id) => {
    //setCarrito[(null)];
    Navigate(`/cargarCarrito?id=${id}`);
  };

  const handleTicket = (id) => {
    Navigate(`/pedidosTicket?id=${id}`);
  };

  const handleFinalizar = async (id) => {
    await finalizado(id);
    variableCambio == 0 ? setVariableCambio([1]) : setVariableCambio([0]);
  };

  const handleCompletar = async (id) => {
    await completado(id);
    variableCambio == 0 ? setVariableCambio([1]) : setVariableCambio([0]);
  };

  const handleEliminar = (id) => {
    setDeleteValue(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const eliminar = () => {
    setConfirmar(true);
  };


  useEffect(() => {
    console.log(idValue);
    if (idValue !== 0) {
      const cargarPedido = async () => {
        const pedido = await listarPedidoUnico(idValue);
        setMoreData(pedido);
        setOpen(true);
      };
      cargarPedido();
    }
  }, [idValue]);

  function renderPedidoEspecifico() {
    if (moreData.length === 0) return <h2>No hay proveedores</h2>;
    return <PedidoEspecifico pedidos={moreData} />;
  }


  /*useEffect(() => {
    if (confirmar) {
      eliminarColor(deleteValue);
      setConfirmar(false);
      setDeleteValue(0);
      handleClose();
    }
  }, [deleteValue, confirmar, eliminarColor]);
*/
  return (
    <div>
      <Paper sx={{ width: "100%" }}>
        <TableContainer sx={{ maxHeight: 380 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{
                      minWidth: column.minWidth,
                      fontWeight: "bold",
                      backgroundColor: "#edd8d3",
                      color: "white",
                      fontSize: "20px",
                      textShadow: "0 0 2px black",
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {pedidos.map((pedido) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={pedido.id}>
                    <TableCell align="center" style={{ fontSize: "20px" }}>
                      {pedido.cliente.nombre}
                    </TableCell>

                    <TableCell align="center" style={{ fontSize: "20px" }}>
                      {pedido.cliente.apellido}
                    </TableCell>

                    <TableCell align="center" style={{ fontSize: "20px" }}>
                      {pedido.total.toLocaleString("es-PY", {
                        style: "currency",
                        currency: "PYG",
                      })}
                    </TableCell>
                    <TableCell align="center" style={{ fontSize: "20px" }}>
                      {pedido.estado}
                    </TableCell>

                    <TableCell align="center" style={{ fontSize: "20px" }}>
                      {fortamtearFecha(pedido.fecha_entrega)}
                    </TableCell>
                    <TableCell align="center" style={{ fontSize: "20px" }}>
                    <IconButton
                        sx={{
                          p: 0,
                          background: "none",
                          border: "none",
                          "&:hover": { color: "success.main" },
                        }}
                        onClick={() => handleExpandirInfo(pedido.id)}
                        disabled={pedido.total > 0 ? false : true}
                      >
                        <AddCircleRoundedIcon fontSize="large" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="Ventana de confirmación o informacion"
      >
        <Box sx={style}>
          {idValue !== 0 ? (
            <>
              <ModalCloseButton>
                <IconButton
                  onClick={() => {
                    setIdValue(0);
                    handleClose();
                  }}
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
              {renderPedidoEspecifico()}
            </>
          ) : (
            <>
              <FullMessage>
                <JustMessage>
                  <h2>¿Desea eliminar el proveedor?</h2>
                </JustMessage>
                <MessageButton>
                  <Button variant="contained" color="error" onClick={eliminar}>
                    Eliminar
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleClose}
                  >
                    Cancelar
                  </Button>
                </MessageButton>
              </FullMessage>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
}

export default CardHome;
