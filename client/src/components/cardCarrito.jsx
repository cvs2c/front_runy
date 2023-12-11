import { useCliente } from "../context/clienteContext.jsx";
import { Navigate, useNavigate } from "react-router-dom";
import { useCarrito } from "../context/carritoContext.jsx";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, IconButton } from "@mui/material";
import { Modal, Box } from "@mui/material";
import { useEffect, useState } from "react";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const columns = [
  { id: "item", label: "Item", align: "center", minWidth: 70 },
  { id: "cantidad", label: "Cantidad", aling: "center", minWidth: 70 },
  { id: "precio", label: "Precio", aling: "center", minWidth: 70 },
  { id: "actions", label: "Acciones", align: "center", minWidth: 50 },
];

function CardCarrito({ carrito }) {
  const { setCarrito } = useCarrito();

  const handleEliminarItem = (index) => {
    // Crea una copia del array original
    const nuevoCarrito = [...carrito];

    // Elimina el elemento en la posición dada por el índice
    nuevoCarrito.splice(index, 1);

    // Actualiza el estado del carrito
    setCarrito(nuevoCarrito);
  };

  //   const navigate = useNavigate();

  //   const handleEditar = (id) => {
  //     navigate(`/clientesForm?id=${id}`);
  //   };

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
              {carrito.map((item, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    {/* <TableCell align="center" style={{ fontSize: "20px" }}>
                      {cliente.nombre}
                    </TableCell>

                    <TableCell align="center" style={{ fontSize: "20px" }}>
                      {cliente.apellido}
                    </TableCell>

                    <TableCell align="center" style={{ fontSize: "20px" }}>
                      {cliente.ci}
                    </TableCell>

                    <TableCell align="center" style={{ fontSize: "20px" }}>
                      {cliente.ruc == null || cliente.ruc == ""
                        ? "-"
                        : cliente.ruc}
                    </TableCell>

                    <TableCell align="center" style={{ fontSize: "20px" }}>
                      {cliente.telefono}
                    </TableCell>

                    <TableCell align="center" style={{ fontSize: "20px" }}>
                      {cliente.correo}
                    </TableCell>
                    <TableCell align="center" style={{ fontSize: "20px" }}>
                      <Button
                        variant="outlined"
                        onClick={() => handleEditar(cliente.id)}
                      >
                        Editar
                      </Button>
                    </TableCell> */}

                    <TableCell align="center" style={{ fontSize: "20px" }}>
                      {item.descripcion}
                    </TableCell>

                    <TableCell align="center" style={{ fontSize: "20px" }}>
                      {item.cantidad}
                    </TableCell>

                    <TableCell aling="center" style={{ fontSize: "20px" }}>
                      {item.precio}
                    </TableCell>

                    <TableCell align="center" style={{ fontSize: "20px" }}>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => handleEliminarItem(index)}
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
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}

export default CardCarrito;
