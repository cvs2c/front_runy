import React, { useEffect, useState } from "react";
import { styled } from "@mui/material";
import { useUsuarios } from "../context/usuariosContext.jsx";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";

const Navegacion = styled("div")({
  backgroundColor: "#edd8d3",
  width: "100%",
  display: "flex",
  height: "120px",
  alignItems: "center",
  justifyContent: "space-between",
});

const Paginas = styled("div")({
  fontSize: "20px",
  fontWeight: "bold",
});

const Elementos = styled("div")({
  display: "flex",
  alignItems: "right",
  paddingRight: "10%",
  gap: "10%",
});

const Titulo = styled("div")({
  fontSize: "60px",
  fontWeight: "bold",
  color: "white",
  paddingLeft: "15%",
  textShadow: "0 0 3px black",
});

const Span = styled("span")({
  fontSize: "20px",
  fontWeight: "bold",
  color: "white",
});

function NavBar() {
  const allowedRoutes = [
    "/home",
    "/proveedor",
    "/productos",
    "/proveedorForm",
    "/clientes",
    "/clientesForm",
    "/productosForm",
    "/colores",
    "/coloresForm",
    "/precios",
    "/preciosForm",
    "/pedidos",
    "/pedidosForm",
    "/carrito",
    "/cargarCarrito",
    "/compras",
    "/comprasForm",
    "/ventas",
    "/pedidosTicket",
  ];

  const isAllowed = allowedRoutes.includes(window.location.pathname);

  const { userLogged, cerrarSesion } = useUsuarios();

  const navigate = useNavigate();

  const [Options, setOptions] = useState("");

  const [rolValue, setRolValue] = useState("");

  const handleSelectedChange = (event) => {
    setOptions(event.target.value);

    //! Porner el las sentencias ifelse dentro de un switch

    if (event.target.value === "proveedor") {
      navigate("/proveedor");
    } else if (event.target.value === "productos") {
      navigate("/productos");
    } else if (event.target.value === "home") {
      navigate("/home");
    } else if (event.target.value === "clientes") {
      navigate("/clientes");
    } else if (event.target.value === "colores") {
      navigate("/colores");
    } else if (event.target.value === "precios") {
      navigate("/precios");
    } else if (event.target.value === "pedidos") {
      navigate("/pedidos");
    } else if (event.target.value === "compras") {
      navigate("/compras");
    } else if (event.target.value === "ventas") {
      navigate("/ventas");
    }
  };

  useEffect(() => {
    if (!userLogged) {
      navigate("/");
    } else {
      setRolValue(userLogged.rol);
    }
  }, [userLogged, navigate]);

  const cierraSession = async () => {
    await cerrarSesion();
    setOptions("");
    navigate("/");
  };

  if (!isAllowed || !userLogged) {
    return null;
  } else {
    return (
      <Navegacion>
        <Titulo>
          Runy<Span> ATELIER </Span>
        </Titulo>

        <Elementos>
          {rolValue && <PersonIcon sx={{ color: "white", fontSize: "50px" }} />}
          {!rolValue && (
            <PersonOutlineIcon sx={{ color: "white", fontSize: "50px" }} />
          )}

          <Paginas>
            <Box sx={{ minWidth: 120, backgroundColor: "lightgray" }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Paginas</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={Options}
                  label="Paginas"
                  onChange={handleSelectedChange}
                >
                  <MenuItem value={"home"}> Principal </MenuItem>
                  {rolValue && (
                    <MenuItem value={"proveedor"}>Proveedor</MenuItem>
                  )}
                  {rolValue && <MenuItem value={"clientes"}>Clientes</MenuItem>}
                  {rolValue && (
                    <MenuItem value={"productos"}>Productos</MenuItem>
                  )}
                  {rolValue && <MenuItem value={"colores"}>Colores</MenuItem>}

                  {rolValue && <MenuItem value={"precios"}>Precios</MenuItem>}
                  <MenuItem value={"pedidos"}>Pedidos</MenuItem>
                  {rolValue && <MenuItem value={"compras"}>Compra</MenuItem>}
                  {rolValue && <MenuItem value={"ventas"}>Ventas</MenuItem>}
                </Select>
              </FormControl>
            </Box>
          </Paginas>

          <Button
            onClick={cierraSession}
            variant="contained"
            sx={{ backgroundColor: "red", color: "white", fontWeight: "bold" }}
          >
            <LogoutIcon />
          </Button>
        </Elementos>
      </Navegacion>
    );
  }
}

export default NavBar;
