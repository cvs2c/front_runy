// import { useCliente } from "../context/clienteContext.jsx";
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
import { format } from "date-fns";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

const columns = [
  { id: "proveedor", label: "Proveedor", align: "center", minWidth: 120 },
  { id: "fecha", label: "Fecha", align: "center", minWidth: 120 },
  { id: "monto", label: "Monto", align: "center", minWidth: 120 },
  { id: "acciones", label: "Acciones", align: "center", minWidth: 180 },
];

function CardCompras({ compras }) {
  const navigate = useNavigate();

  const handleEditar = (id) => {
    navigate(`/comprasForm?id=${id}`);
  };

  const fortamtearFecha = (dateValue) => {
    const [año, mes, dia] = dateValue.split("-");
    const fechaFormateada = `${dia}/${mes}/${año}`;

    return fechaFormateada;
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
              {compras.map((compra) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={compra.id}>
                    <TableCell align="center" style={{ fontSize: "20px" }}>
                      {compra.proveedor.nombre} {compra.proveedor.apellido}
                    </TableCell>

                    <TableCell align="center" style={{ fontSize: "20px" }}>
                      {fortamtearFecha(compra.fecha)}
                    </TableCell>

                    <TableCell align="center" style={{ fontSize: "20px" }}>
                      {compra.monto.toLocaleString("es-PY", {
                        style: "currency",
                        currency: "PYG",
                      })}
                    </TableCell>

                    <TableCell align="center">
                      <Button
                        variant="outlined"
                        onClick={() => handleEditar(compra.id)}
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

export default CardCompras;
