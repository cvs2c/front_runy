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

const columns = [
  { id: "prodcuto", label: "Producto", align: "center", minWidth: 120 },
  { id: "cantidad", label: "Cantidad", align: "center", minWidth: 120 },
];

function PedidoEspecifico({ pedidos }) {
//   const { carrito, setCarrito, listarPedido } = useCarrito();
//   const { finalizado, completado, variableCambio, setVariableCambio } =
//     usePedidos();

//   const Navigate = useNavigate();

//   const [deleteValue, setDeleteValue] = useState(0);
//   const [confirmar, setConfirmar] = useState(false);
//   const [open, setOpen] = useState(false);
//   const [idValue, setIdValue] = useState(0);
//   const [moreData, setMoreData] = useState([]);

//   const handleCarrito = (id) => {
//     //setCarrito[(null)];
//     Navigate(`/cargarCarrito?id=${id}`);
//   };

//   const handleTicket = (id) => {
//     Navigate(`/pedidosTicket?id=${id}`);
//   };

//   const handleFinalizar = async (id) => {
//     await finalizado(id);
//     variableCambio == 0 ? setVariableCambio([1]) : setVariableCambio([0]);
//   };

//   const handleCompletar = async (id) => {
//     await completado(id);
//     variableCambio == 0 ? setVariableCambio([1]) : setVariableCambio([0]);
//   };

//   const handleEliminar = (id) => {
//     setDeleteValue(id);
//     setOpen(true);
//   };

//   const handleExpandirInfo = (id) => {
//     setIdValue(id);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const eliminar = () => {
//     setConfirmar(true);
//   };

//   useEffect(() => {
//     if (idValue !== 0) {
//       const cargarPedido = async () => {
//         const pedido = await listarPedido(idValue);
//         setMoreData(pedido);
//         setOpen(true);
//       };
//       cargarPedido();
//     }
//   }, [idValue]);

  //   function renderProveedorEspecifico() {
  //     if (moreData.length === 0) return <h2>No hay proveedores</h2>
  //     return <ProveedorEspecifico pedido={moreData} />
  // }

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
    <>
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

                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
}

export default PedidoEspecifico;
