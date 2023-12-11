import { useNavigate } from "react-router-dom";
import { usePedidos } from "../context/pedidoContext.jsx";
import { useCarrito } from "../context/carritoContext.jsx";
import { useEffect, useState } from "react";
import { format } from "date-fns";
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
  { id: "producto", label: "Producto", align: "center", minWidth: 120 },
  { id: "cantidad", label: "Cantidad", align: "center", minWidth: 120 },
  { id: "precio", label: "Precio", align: "center", minWidth: 120 }
];

function CardPedidoTicket({ pedidos }) {
  const { carrito, setCarrito } = useCarrito();
  const { finalizado, completado, variableCambio, setVariableCambio  } = usePedidos();

  const Navigate = useNavigate();

  const [deleteValue, setDeleteValue] = useState(0);
  const [confirmar, setConfirmar] = useState(false);
  const [open, setOpen] = useState(false);

  const handleCarrito = (id) => {
    //setCarrito[(null)];
    Navigate(`/cargarCarrito?id=${id}`);
  };

  const handleTicket = (id) => {
    Navigate(`/pedidosTicket?id=${id}`);
  };

  const handleFinalizar =  async(id) => {
    await finalizado(id);
    variableCambio == 0 ? setVariableCambio([1]):setVariableCambio([0]);
  };

  const handleCompletar =  async(id) => {
    await completado(id);
    variableCambio == 0 ? setVariableCambio([1]):setVariableCambio([0]);
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
                      {pedido.producto.descripcion}
                    </TableCell>

                    <TableCell align="center" style={{ fontSize: "20px" }}>
                      {pedido.cantidad}
                    </TableCell>

                    <TableCell align="center" style={{ fontSize: "20px" }}>
                      {pedido.precio.toLocaleString("es-PY", {
                        style: "currency",
                        currency: "PYG",
                      })}
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
        <Box sx={styleModal}>
          <ModalCloseButton>
            <IconButton
              onClick={() => {
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

          <FullMessage>
            <JustMessage>
              <h2>¿Desea eliminar el color?</h2>
            </JustMessage>
            <MessageButton>
              <Button variant="contained" color="error" onClick={eliminar}>
                Eliminar
              </Button>
              <Button variant="outlined" color="primary" onClick={handleClose}>
                Cancelar
              </Button>
            </MessageButton>
          </FullMessage>
        </Box>
      </Modal>
    </div>
  );
}

export default CardPedidoTicket;
