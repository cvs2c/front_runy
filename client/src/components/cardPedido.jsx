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
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import CancelIcon from "@mui/icons-material/Cancel";
import {
  Espaciado,
  FullMessage,
  JustMessage,
  MessageButton,
  styleModal,
  ModalCloseButton,
} from "../css/componentsCss.jsx";

import PedidoEspecifico from "./pedidoEspecifico.jsx";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ModeEdit from "@mui/icons-material/ModeEdit";
import ReceiptIcon from "@mui/icons-material/Receipt";

const columns = [
  { id: "nombre", label: "Nombre", align: "center", minWidth: 120 },
  { id: "apellido", label: "Apellido", align: "center", minWidth: 120 },
  { id: "total", label: "Total", align: "center", minWidth: 120 },
  { id: "estado", label: "Estado", align: "center", minWidth: 120 },
  { id: "fecha", label: "Entrega", align: "center", minWidth: 120 },
  { id: "acciones", label: "Acciones", align: "center", minWidth: 300 },
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

function CardPedido({ pedidos }) {
  const { carrito, setCarrito, listarPedidoUnico } = useCarrito();
  const {
    finalizado,
    completado,
    variableCambio,
    setVariableCambio,
    eliminarPedido,
  } = usePedidos();

  const Navigate = useNavigate();

  const [deleteValue, setDeleteValue] = useState(0);
  const [confirmar, setConfirmar] = useState(false);
  const [open, setOpen] = useState(false);
  const [idValue, setIdValue] = useState(0);
  const [moreData, setMoreData] = useState([]);

  const fortamtearFecha = (dateValue) => {
    const [año, mes, dia] = dateValue.split("-");
    const fechaFormateada = `${dia}/${mes}/${año}`;

    return fechaFormateada;
  };

  const handleCarrito = (id) => {
    //setCarrito[(null)];
    Navigate(`/cargarCarrito?id=${id}`);
  };

  const handleTicket = (id) => {
    Navigate(`/pedidosTicket?id=${id}`);
  };
  const handleEditar = (id) => {
    Navigate(`/pedidosForm?id=${id}`);
  };

  const handleFinalizar = async (id) => {
    await finalizado(id);
    variableCambio == 0 ? setVariableCambio([1]) : setVariableCambio([0]);
  };

  const handleCompletar = async (id) => {
    await completado(id);
    variableCambio == 0 ? setVariableCambio([1]) : setVariableCambio([0]);
  };

  const handleEliminar = async(id) => {
    await eliminarPedido(id);
    variableCambio == 0 ? setVariableCambio([1]) : setVariableCambio([0]);
  };

  const handleExpandirInfo = (id) => {
    setIdValue(id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const eliminar = () => {
    setConfirmar(true);
  };
  const cambioVariable = () => {
    variableCambio == 0 ? setVariableCambio([1]) : setVariableCambio([0]);
  };

  useEffect(() => {
    if (confirmar) {
      eliminarPedido(deleteValue);
      setConfirmar(false);
      setDeleteValue(0);
      handleClose();
    }
  }, [deleteValue, confirmar]);

  useEffect(() => {
    console.log(idValue);
    if (idValue !== 0) {
      const cargarPedido = async () => {
        const pedido = await listarPedidoUnico(idValue);
        console.log(pedido);
        setMoreData(pedido);
        setOpen(true);
      };
      cargarPedido();
    }
  }, [idValue]);

  useEffect(() => {
    console.log(moreData);
  }, [moreData]);

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
                    <TableCell align="center">
                      <Espaciado>
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
                        {/*PENDIENTES*/}
                        {pedido.estado == "P" && (
                          <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => handleCarrito(pedido.id)}
                            disabled={pedido.total > 0 ? true : false}
                          >
                            <AddShoppingCartIcon
                              fontSize="medium"
                              sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            />
                          </Button>
                        )}
                        {pedido.estado == "P" && (
                          <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => handleFinalizar(pedido.id)}
                            disabled={pedido.total == 0 ? true : false}
                          >
                            F
                          </Button>
                        )}
                        {pedido.estado == "P" && (
                          <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => handleEditar(pedido.id)}
                            // disabled={pedido.total == 0 ? true : false}
                          >
                            <ModeEditIcon
                              fontSize="medium"
                              sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            />
                          </Button>
                        )}
                        {/*FIN PENDIENTES*/}
                        {/*Finalizados*/}
                        {pedido.estado == "F" && (
                          <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => handleCompletar(pedido.id)}
                            //disabled={pedido.total == 0 ? true : false}
                          >
                            C
                          </Button>
                        )}
                        {/*FIN FINALIZADOS*/}
                        {/*COMPLETADOS*/}
                        {pedido.estado == "C" && (
                          <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => handleTicket(pedido.id)}
                            //disabled={pedido.total == 0 ? true : false}
                          >
                            <ReceiptIcon
                              fontSize="medium"
                              sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            />
                          </Button>
                        )}
                        {pedido.estado == "C" && (
                          <Button
                            variant="contained"
                            color="error"
                            onClick={() => handleEliminar(pedido.id)}
                            //disabled={pedido.total == 0 ? true : false}
                          >
                            <DeleteOutlineIcon
                              fontSize="medium"
                              sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            />
                          </Button>
                        )}
                        {/*FIN COMPLETADOS*/}
                      </Espaciado>
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
                  <h2>¿Desea eliminar el pedido?</h2>
                </JustMessage>
                <MessageButton>
                  <Button variant="contained" color="error" onClick={() => {eliminar(); cambioVariable();} }>
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

export default CardPedido;
