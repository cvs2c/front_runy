import { useState, useEffect } from "react";
import { useProductos } from "../../context/productoContext.jsx";
import AddIcon from '@mui/icons-material/Add';
import {
  Lista,
  Titulo,
  ButtonAggregar,
  BarraGeneralDeBusqueda,
  CombinacionDeBarraYBotones,
} from "../../css/componentsCss.jsx";
import CardProducto from "../../components/cardProducto.jsx";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { Autocomplete, TextField } from "@mui/material";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";

function Productos() {
  const { productos, listarProductos, valorEliminado, setValorEliminado } =
    useProductos();

  const [valorBuscado, setValorBuscado] = useState("None");

  const handleAutocompleteChange = (event, newValue) => {
    setValorBuscado(newValue);
  };

  useEffect(() => {
    if (valorBuscado === "None") {
      listarProductos();
    }

    if (valorEliminado) {
      listarProductos();
      setValorEliminado(false);
    }
  }, [valorBuscado, valorEliminado]);

  function renderProductos() {
    if (productos.length === 0) return <h2>No hay productos</h2>;
    return (
      <CardProducto
        productos={valorBuscado !== "None" ? valorBuscado : productos}
      />
    );
  }

  return (
    <>
      <Titulo>PRODUCTOS</Titulo>
      <Lista>
        <BarraGeneralDeBusqueda>
          <Autocomplete
            multiple
            id="lista-productos"
            options={productos}
            getOptionLabel={(option) =>
              option.referencia +
              " " +
              option.color.color +
              " " +
              option.tamanho
            }
            isOptionEqualToValue={(option, value) => option.id === value.id}
            onChange={handleAutocompleteChange}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                label="Buscar Producto"
                placeholder="Buscar Producto"
              />
            )}
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

            <Link to="/productosForm">
              <Button variant="outlined" color="primary" sx={ButtonAggregar}>
               <AddIcon fontSize="medium" sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}/>
              </Button>
            </Link>
          </CombinacionDeBarraYBotones>
        </BarraGeneralDeBusqueda>
      </Lista>

      <Lista>{renderProductos()}</Lista>
    </>
  );
}

export default Productos;
