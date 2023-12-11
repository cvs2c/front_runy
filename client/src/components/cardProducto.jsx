import { useNavigate, useLocation } from "react-router-dom";
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
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {
  Espaciado,
  styleModal,
  ModalCloseButton,
  FullMessage,
  JustMessage,
  MessageButton,
} from "../css/componentsCss.jsx";

const columns = [
  { id: "referencia", label: "Referencia", align: "center", minWidth: 100 },
  { id: "refColor", label: "Ref. Color", align: "center", minWidth: 100 },
  { id: "color", label: "Color", align: "center", minWidth: 100 },
  { id: "tamaño", label: "Tamaño", align: "center", minWidth: 100 },
  { id: "precio_compra", label: "P. Compra", align: "center", minWidth: 100 },
  {
    id: "precio_venta_normal",
    label: "P. Venta",
    align: "center",
    minWidth: 100,
  },
  {
    id: "precio_venta_personalizado",
    label: "P. Personalizado",
    align: "center",
    minWidth: 100,
  },
  { id: "stock", label: "Stock", align: "center", minWidth: 100 },
  { id: "acciones", label: "Acciones", align: "center", minWidth: 280 },
];

function CardProducto({ productos }) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const pedidoid = searchParams.get("id");

  const navigate = useNavigate();
  const { eliminarProducto, listarProducto } = useProductos();

  const [deleteValue, setDeleteValue] = useState(0);
  const [confirmar, setConfirmar] = useState(false);
  const [open, setOpen] = useState(false);
  const [moreData, setMoreData] = useState([]);
  const [idValue, setIdValue] = useState(0);

  const handleEditar = (id) => {
    navigate(`/productosForm?id=${id}`);
    console.log(id);
  };

  const handleExpandirInfo = (id) => {
    setIdValue(id);
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
    if (confirmar) {
      eliminarProducto(deleteValue);
      setConfirmar(false);
      setDeleteValue(0);
      handleClose();
    }

    if (idValue !== 0) {
      const cargarProducto = async () => {
        const producto = await listarProducto(idValue);
        setMoreData(producto);
        setOpen(true);
      };
      cargarProducto();
    }
  }, [deleteValue, confirmar, idValue]);

  function renderProductoEspecifico(params) {
    if (moreData.length === 0) return <h2>No hay productos</h2>;
    return <ProductoEspecifico producto={moreData} />;
  }

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
              {productos.map((producto) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={producto.id}
                  >
                    <TableCell align="center" style={{ fontSize: "20px" }}>
                      {producto.referencia}
                    </TableCell>
                    <TableCell align="center" style={{ fontSize: "20px" }}>
                      {producto.color.referenciaColor}
                    </TableCell>
                    <TableCell align="center" style={{ fontSize: "20px" }}>
                      {producto.color.color}
                    </TableCell>
                    <TableCell align="center" style={{ fontSize: "20px" }}>
                      {producto.tamanho}
                    </TableCell>
                    <TableCell align="center" style={{ fontSize: "20px" }}>
                      {producto.precio_compra.toLocaleString("es-PY", {
                        style: "currency",
                        currency: "PYG",
                      })}
                    </TableCell>
                    <TableCell align="center" style={{ fontSize: "20px" }}>
                      {producto.precio_venta_normal.toLocaleString("es-PY", {
                        style: "currency",
                        currency: "PYG",
                      })}
                    </TableCell>
                    <TableCell align="center" style={{ fontSize: "20px" }}>
                      {producto.precio_venta_personalizado.toLocaleString(
                        "es-PY",
                        {
                          style: "currency",
                          currency: "PYG",
                        }
                      )}
                    </TableCell>
                    <TableCell align="center" style={{ fontSize: "20px" }}>
                      {producto.stock}
                    </TableCell>
                    <TableCell align="center" style={{ fontSize: "20px" }}>
                      <Espaciado>
                        <IconButton
                          sx={{
                            p: 0,
                            background: "none",
                            border: "none",
                            "&:hover": { color: "success.main" },
                          }}
                          onClick={() => handleExpandirInfo(producto.id)}
                        >
                          <AddCircleRoundedIcon fontSize="large" />
                        </IconButton>
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={() => handleEditar(producto.id)}
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
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => handleEliminar(producto.id)}
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
              {renderProductoEspecifico()}
            </>
          ) : (
            <>
              <FullMessage>
                <JustMessage>
                  <h2>¿Desea eliminar el producto?</h2>
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

export default CardProducto;
