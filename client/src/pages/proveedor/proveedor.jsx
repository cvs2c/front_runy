import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useProveedor } from "../../context/proveedorContext.jsx";
import CardProveedor from "../../components/cardProveedor.jsx";
import Button from "@mui/material/Button";
import styled from "@emotion/styled";
import { Autocomplete, TextField } from "@mui/material";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import AddIcon from "@mui/icons-material/Add";
import { BarraGeneralDeBusqueda, CombinacionDeBarraYBotones } from "../../css/componentsCss.jsx";

const Lista = styled("div")({
  display: "flex",
  justifyContent: "center",
  marginBottom: "5px",
});

const ButtonStyle = {
  margin: "10px",
  padding: "10px",
};

const Titulo = styled("h1")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: "5px",
});

const BarraGeneral = styled("div")({
  display: "grid",
  gridTemplateColumns: "3fr 1fr",
});

const ElementsCombined = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginLeft: "10px",
});

function Proveedor() {
  const { proveedores, listarProveedores, valorEliminado, setValorEliminado } =
    useProveedor();

  const [valorBuscado, setValorBuscado] = useState("None");

  const handleAutocompleteChange = (event, newValue) => {
    setValorBuscado(newValue);
  };

  useEffect(() => {
    if (valorBuscado === "None") {
      listarProveedores();
    }

    if (valorEliminado) {
      listarProveedores();
      setValorEliminado(false);
    }
  }, [valorEliminado, valorBuscado]);

  function renderProveedores() {
    if (proveedores.length === 0) return <h2>No hay proveedores</h2>;
    return (
      <CardProveedor
        proveedores={valorBuscado !== "None" ? valorBuscado : proveedores}
      />
    );
  }

  console.log(valorBuscado);

  return (
    <>
      <Titulo>PROVEEDORES</Titulo>
      <Lista>
        <BarraGeneralDeBusqueda>
          <Autocomplete
            multiple
            id="proveedores-tags"
            options={proveedores}
            getOptionLabel={(option) =>
              option.nombre + " " + option.apellido + " " + option.empresa
            }
            isOptionEqualToValue={(option, value) => option.id === value.id}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                label="Buscar Proveedor"
                placeholder="Buscar Proveedor"
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

            <Link to="/proveedorForm">
              {/* <Button variant="outlined" color="primary" sx={ButtonStyle}>
                                Agregar 
                            </Button> */}
              <Button variant="outlined" color="primary">
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

      <Lista>{renderProveedores()}</Lista>
    </>
  );
}

export default Proveedor;
