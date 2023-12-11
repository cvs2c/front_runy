import { useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useProductos } from "../context/productoContext.jsx";
import { Button, IconButton } from "@mui/material";
import { Modal, Box } from "@mui/material";
import { useEffect, useState } from "react";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import CancelIcon from "@mui/icons-material/Cancel";
import ProductoEspecifico from "./productoEspecifico.jsx";
import {
  Espaciado,
  styleModal,
  ModalCloseButton,
  FullMessage,
  JustMessage,
  MessageButton,
} from "../css/componentsCss.jsx";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

const columns = [
  { id: "referencia", label: "Referencia", align: "center", minWidth: 100 },
  { id: "tamaño", label: "Tamaño", align: "center", minWidth: 100 },
  { id: "precio_compra", label: "P.Compra", align: "center", minWidth: 100 },
  {
    id: "precio_venta_normal",
    label: "P.Venta",
    align: "center",
    minWidth: 100,
  },
  {
    id: "precio_venta_personalizado",
    label: "P.Personalizado",
    align: "center",
    minWidth: 100,
  },
  { id: "acciones", label: "Acciones", align: "center", minWidth: 200 },
];

function CardPrecios({ productos }) {
  const navigate = useNavigate();

  const handleEditar = (referencia, tamanho) => {
    navigate(`/preciosForm?referencia=${referencia}&tamanho=${tamanho}`);
  };

  function filtrarPrecios(productos) {
    const uniqueCombos = new Set();
    return productos.filter((producto) => {
      const combo = producto.referencia + producto.tamanho;
      if (uniqueCombos.has(combo)) {
        return false; // Skip duplicate combinations
      }
      uniqueCombos.add(combo);
      return true; // Keep unique combinations
    });
  }

  const productosPrecios = filtrarPrecios(productos);

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
              {productosPrecios.map((productoPrecio) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={productoPrecio.id}
                  >
                    <TableCell align="center" style={{ fontSize: "20px" }}>
                      {productoPrecio.referencia}
                    </TableCell>

                    <TableCell align="center" style={{ fontSize: "20px" }}>
                      {productoPrecio.tamanho}
                    </TableCell>
                    <TableCell align="center" style={{ fontSize: "20px" }}>
                      {productoPrecio.precio_compra.toLocaleString(
                        "es-PY",
                        {
                          style: "currency",
                          currency: "PYG",
                        }
                      )}
                    </TableCell>
                    <TableCell align="center" style={{ fontSize: "20px" }}>
                      {productoPrecio.precio_venta_normal.toLocaleString(
                        "es-PY",
                        {
                          style: "currency",
                          currency: "PYG",
                        }
                      )}
                    </TableCell>
                    <TableCell align="center" style={{ fontSize: "20px" }}>
                      {productoPrecio.precio_venta_personalizado.toLocaleString(
                        "es-PY",
                        {
                          style: "currency",
                          currency: "PYG",
                        }
                      )}
                    </TableCell>

                    <TableCell align="center" style={{ fontSize: "20px" }}>
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() =>
                          handleEditar(
                            productoPrecio.referencia,
                            productoPrecio.tamanho
                          )
                        }
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

export default CardPrecios;
