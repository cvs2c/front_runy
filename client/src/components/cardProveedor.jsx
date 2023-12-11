import { useProveedor } from "../context/proveedorContext.jsx";
import { useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import styled from "@emotion/styled";
import Paper from "@mui/material/Paper";
import { Button, IconButton } from "@mui/material";
import { Modal, Box } from "@mui/material";
import { useEffect, useState } from "react";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import ProveedorEspecifico from "./proveedorEspecifico.jsx";
import CancelIcon from "@mui/icons-material/Cancel";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const columns = [
  { id: "nombre", label: "Nombre", align: "center", minWidth: 100 },
  { id: "apellido", label: "Apellido", align: "center", minWidth: 100 },
  { id: "telefono", label: "Telefono", align: "center", minWidth: 100 },
  { id: "empresa", label: "Empresa", align: "center", minWidth: 100 },
  { id: "pais", label: "Pais", align: "center", minWidth: 100 },
  { id: "productos", label: "Productos", align: "center", minWidth: 150 },
  { id: "acciones", label: "Acciones", align: "center", minWidth: 280 },
];

const Espaciado = styled("div")({
  display: "flex",
  justifyContent: "space-around",
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "20px",
};

const ModalCloseButton = styled("div")({
  display: "flex",
  justifyContent: "flex-end",
});

const FullMessage = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
});
const JustMessage = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});
const MessageButton = styled("div")({
  display: "flex",
  justifyContent: "space-around",
});

function CardProveedor({ proveedores }) {
  const navigate = useNavigate();
  const { eliminarProveedor, listarProveedor } = useProveedor();

  const [open, setOpen] = useState(false);
  const [deleteValue, setDeleteValue] = useState(0);
  const [confirmar, setConfirmar] = useState(false);
  const [moreData, setMoreData] = useState([]);
  const [idValue, setIdValue] = useState(0);

  const handleEditar = (id) => {
    navigate(`/proveedorForm?id=${id}`);
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
      eliminarProveedor(deleteValue);
      setConfirmar(false);
      setDeleteValue(0);
      handleClose();
    }

    if (idValue !== 0) {
      const cargarProveedor = async () => {
        const proveedor = await listarProveedor(idValue);
        setMoreData(proveedor);
        setOpen(true);
      };
      cargarProveedor();
    }
  }, [deleteValue, confirmar, eliminarProveedor, idValue]);
  function renderProveedorEspecifico() {
    if (moreData.length === 0) return <h2>No hay proveedores</h2>;
    return <ProveedorEspecifico proveedor={moreData} />;
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
              {proveedores.map((proveedor) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={proveedor.id}
                  >
                    <TableCell align="center" style={{ fontSize: "20px" }}>
                      {proveedor.nombre}
                    </TableCell>

                    <TableCell align="center" style={{ fontSize: "20px" }}>
                      {proveedor.apellido}
                    </TableCell>

                    <TableCell align="center" style={{ fontSize: "20px" }}>
                      {proveedor.telefono}
                    </TableCell>

                    <TableCell align="center" style={{ fontSize: "20px" }}>
                      {proveedor.empresa}
                    </TableCell>

                    <TableCell align="center" style={{ fontSize: "20px" }}>
                      {proveedor.pais}
                    </TableCell>

                    <TableCell align="center" style={{ fontSize: "20px" }}>
                      {proveedor.productos}
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
                          onClick={() => handleExpandirInfo(proveedor.id)}
                        >
                          <AddCircleRoundedIcon fontSize="large" />
                        </IconButton>
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={() => handleEditar(proveedor.id)}
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
                          onClick={() => handleEliminar(proveedor.id)}
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
              {renderProveedorEspecifico()}
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

export default CardProveedor;
