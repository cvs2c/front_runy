import { useEffect, useState } from "react";
import { useColor } from "../../context/colorContext.jsx";
import CardColor from "../../components/cardColor.jsx";
import { Link } from "react-router-dom";
import { Button, Autocomplete, TextField } from "@mui/material";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import AddIcon from "@mui/icons-material/Add";
import {
  Lista,
  Titulo,
  ButtonAggregar,
  CombinacionDeBarraYBotones,
  BarraGeneralDeBusqueda,
} from "../../css/componentsCss.jsx";

function Color() {
  const { colores, listarColores, valorEliminado, setValorEliminado } =
    useColor();

  const [valorBuscado, setValorBuscado] = useState("None");

  const handleAutocompleteChange = (event, newValue) => {
    setValorBuscado(newValue);
  };

  useEffect(() => {
    if (valorBuscado === "None") {
      listarColores();
    }

    if (valorEliminado) {
      listarColores();
      setValorEliminado(false);
    }
  }, [valorBuscado, valorEliminado]);

  function renderColor() {
    if (colores.length === 0) return <h2>No hay colores</h2>;
    return (
      <CardColor colores={valorBuscado !== "None" ? valorBuscado : colores} />
    );
  }

  return (
    <>
      <Titulo>COLOR</Titulo>
      <Lista>
        <BarraGeneralDeBusqueda>
          <Autocomplete
            multiple
            id="colores-tags"
            options={colores}
            getOptionLabel={(option) =>
              option.color + " " + option.referenciaColor
            }
            isOptionEqualToValue={(option, value) => option.id === value.id}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                label="Buscar Color"
                placeholder="Buscar Color"
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

            <Link to="/coloresForm">
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
      <Lista>{renderColor()}</Lista>
    </>
  );
}

export default Color;
