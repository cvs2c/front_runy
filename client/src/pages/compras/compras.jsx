import { useState, useEffect } from "react";
// import { useCompras } from "../../context/pedidoContext.jsx";
import { useCompras } from "../../context/compraContext.jsx";
// import CardPedido from "../../components/cardPedido.jsx";
import CardCompras from "../../components/cardCompras.jsx";
import AddIcon from "@mui/icons-material/Add";
import {
  Lista,
  Titulo,
  ButtonAggregar,
  BarraGeneralDeBusqueda,
  CombinacionDeBarraYBotones,
} from "../../css/componentsCss.jsx";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import {
  Autocomplete,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";

function Compras() {
  const { compras, listarCompras, listarCompra } = useCompras();

  const [valorBuscado, setValorBuscado] = useState("None");

  const handleAutocompleteChange = (event, newValue) => {
    setValorBuscado(newValue);
  };

  useEffect(() => {
    if (valorBuscado === "None") {
      listarCompras();
    }
  }, []);

  useEffect(() => {
    console.log(compras);
  }, [compras]);

  function renderCompras() {
    if (compras.length === 0) return <p>No hay compras</p>;
    return (
      <CardCompras compras={valorBuscado === "None" ? compras : valorBuscado} />
    );
  }

  const fortamtearFecha = (dateValue) => {
    const [año, mes, dia] = dateValue.split("-");
    const fechaFormateada = `${dia}/${mes}/${año}`;

    return fechaFormateada;
  };

  return (
    <>
      <Titulo>COMPRAS</Titulo>
      <Lista>
        <BarraGeneralDeBusqueda>
          <Autocomplete
            multiple
            id="clientes-tags"
            options={compras}
            getOptionLabel={(option) =>
              option.proveedor.nombre + " " + option.proveedor.apellido + " " + fortamtearFecha(option.fecha)
            }
            isOptionEqualToValue={(option, value) => option.id === value.id}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                label="Buscar Compra"
                placeholder="Buscar Compra"
              />
            )}
            onChange={handleAutocompleteChange}
          />
          <CombinacionDeBarraYBotones>
            <button variant="outlined" onClick={() => setValorBuscado("None")}>
              <RotateLeftIcon
                fontSize="medium"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              />
            </button>

            <Link to="/comprasForm">
              <Button variant="outlined" color="primary" sx={ButtonAggregar}>
                <AddIcon
                  fontSize="medium"
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                />
              </Button>
            </Link>
          </CombinacionDeBarraYBotones>
        </BarraGeneralDeBusqueda>
      </Lista>

      <Lista>{renderCompras()}</Lista>
    </>
  );
}

export default Compras;
