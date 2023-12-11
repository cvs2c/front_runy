import { useCliente } from "../context/clienteContext.jsx";
import { Navigate, useNavigate } from "react-router-dom";
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
import ModeEditIcon from "@mui/icons-material/ModeEdit";

const columns = [
  { id: "nombre", label: "Nombre", align: "center", minWidth: 120 },
  { id: "apellido", label: "Apellido", align: "center", minWidth: 120 },
  { id: "ci", label: "C.I.", align: "center", minWidth: 100 },
  { id: "ruc", label: "RUC", align: "center", minWidth: 100 },
  { id: "telefono", label: "Telefono", align: "center", minWidth: 100 },
  { id: "correo", label: "Correo", align: "center", minWidth: 120 },
  { id: "acciones", label: "Acciones", align: "center", minWidth: 120 },
];

function CardClientes({ clientes }) {
  const navigate = useNavigate();

  const handleEditar = (id) => {
    navigate(`/clientesForm?id=${id}`);
  };

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
              {clientes.map((cliente) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={cliente.id}
                  >
                    <TableCell align="center" style={{ fontSize: "20px" }}>
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
                        <ModeEditIcon
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

export default CardClientes;
