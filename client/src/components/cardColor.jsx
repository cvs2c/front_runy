import { useNavigate } from "react-router-dom";
import { useColor } from "../context/colorContext.jsx";
import { useEffect, useState } from "react";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
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
  {
    id: "referenciaColor",
    label: "Referencia",
    align: "center",
    minWidth: 120,
  },
  { id: "color", label: "Color", align: "center", minWidth: 120 },
  { id: "acciones", label: "Acciones", align: "center", minWidth: 250 },
];

function CardColor({ colores }) {
  const Navigate = useNavigate();
  const { eliminarColor } = useColor();

  const [deleteValue, setDeleteValue] = useState(0);
  const [confirmar, setConfirmar] = useState(false);
  const [open, setOpen] = useState(false);

  const handleEditar = (id) => {
    Navigate(`/coloresForm?id=${id}`);
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
      eliminarColor(deleteValue);
      setConfirmar(false);
      setDeleteValue(0);
      handleClose();
    }
  }, [deleteValue, confirmar, eliminarColor]);

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
              {colores.map((color) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={color.id}>
                    <TableCell align="center" style={{ fontSize: "20px" }}>
                      {color.referenciaColor}
                    </TableCell>

                    <TableCell align="center" style={{ fontSize: "20px" }}>
                      {color.color}
                    </TableCell>
                    <TableCell align="center" style={{ fontSize: "20px" }}>
                      <Espaciado>
                        <Button
                          variant="outlined"
                          onClick={() => handleEditar(color.id)}
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
                          onClick={() => handleEliminar(color.id)}
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

export default CardColor;
