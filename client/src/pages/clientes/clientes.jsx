import { useState, useEffect } from "react";
import { useCliente } from "../../context/clienteContext.jsx";
import {
  Lista,
  Titulo,
  CombinacionDeBarraYBotones,
  BarraGeneralDeBusqueda,
  ButtonAggregar,
} from "../../css/componentsCss.jsx";
import { Link } from "react-router-dom";
import CardClientes from "../../components/cardCliente.jsx";
import { Button } from "@mui/material";
import { Autocomplete, TextField } from "@mui/material";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import AddIcon from "@mui/icons-material/Add";

function Clientes() {
  const { listarClientes, clientes } = useCliente();

  const [valorBuscado, setValorBuscado] = useState("None");

  const handleAutocompleteChange = (event, newValue) => {
    setValorBuscado(newValue);
  };

  useEffect(() => {
    if (valorBuscado === "None") {
      listarClientes();
    }
  }, [valorBuscado]);

  function renderClientes() {
    if (clientes.length === 0) return <h2>No hay clientes</h2>;
    return (
      <CardClientes
        clientes={valorBuscado !== "None" ? valorBuscado : clientes}
      />
    );
  }

  return (
    <>
      <Titulo>CLIENTES</Titulo>
      <Lista>
        <BarraGeneralDeBusqueda>
          <Autocomplete
            multiple
            id="clientes-tags"
            options={clientes}
            getOptionLabel={(option) =>
              option.nombre + " " + option.apellido + " " + option.ci
            }
            isOptionEqualToValue={(option, value) => option.id === value.id}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                label="Buscar Cliente"
                placeholder="Buscar Cliente"
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

            <Link to="/clientesForm">
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

      <Lista>{renderClientes()}</Lista>
    </>
  );
}

export default Clientes;
