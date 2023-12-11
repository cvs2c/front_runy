import { useState, useEffect } from "react";
import { usePedidos } from "../../context/pedidoContext.jsx";
import CardPedido from "../../components/cardPedido.jsx";
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
import AddIcon from "@mui/icons-material/Add";

function Pedidos() {
  const {
    listarPedidos,
    pedidos,
    listarPedidosPendientes,
    listarPedidosFinalizados,
    listarPedidoCompletados,
    variableCambio,
    setVariableCambio,
  } = usePedidos();

  const [valorBuscado, setValorBuscado] = useState("None");

  const handleAutocompleteChange = (event, newValue) => {
    setValorBuscado(newValue);
  };

  const handleChange = (event) => {
    setEstadoPedido({
      ...estadoPedido,
      [event.target.name]: event.target.value,
    });
  };

  const [estadoPedido, setEstadoPedido] = useState({
    estado: "P",
  });
  //const [valorFiltrado, setValorFiltrado] = useState(['']);

  // useEffect(() => {
  //   listarPedidos();

  // }, [estadoPedido]);

  // useEffect(() => {
  //   listarPedidos();

  //   //  //console.log('valorfiltrado: ',pedidos);
  //   // console.log(estadoPedido.estado);
  // }, []);
  useEffect(() => {
    console.log("variablecambio: ", variableCambio);
  }, [variableCambio]);

  useEffect(() => {
    if (estadoPedido.estado == "P") {
      if (valorBuscado == "None") {
        listarPedidosPendientes();
      }
    }
    if (estadoPedido.estado == "F") {
      if (valorBuscado == "None") {
        listarPedidosFinalizados();
      }
    }
    if (estadoPedido.estado == "C") {
      if (valorBuscado == "None") {
        listarPedidoCompletados();
      }
    }
  }, [estadoPedido.estado, variableCambio, valorBuscado, pedidos.eliminado]);

  useEffect(() => {
    console.log("valor filtrado: ", pedidos);
  }, [pedidos]);

  function renderPedidos() {
    if (pedidos.length === 0) return <h2> No hay pedidos</h2>;
    return (
      <CardPedido pedidos={valorBuscado != "None" ? valorBuscado : pedidos} />
    );
  }

  return (
    <>
      <Titulo>PEDIDOS</Titulo>
      <Lista>
        <BarraGeneralDeBusqueda>
          <Autocomplete
            multiple
            id="pedidos-tags"
            options={pedidos}
            getOptionLabel={(option) =>
              option.cliente.nombre + " " + option.cliente.apellido 
             }
            isOptionEqualToValue={(option, value) => option.id === value.id}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                label="Buscar Pedido"
                placeholder="Buscar Pedido"
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

            <Link to="/pedidosForm">
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
      <Lista>
        {" "}
        <FormControl>
          <InputLabel id="select-label">Selecciona el estado</InputLabel>
          <Select
            name="estado"
            label="Estado"
            variant="filled"
            value={estadoPedido.estado}
            onChange={handleChange}
            style={{ width: "250px" }}
          >
            <MenuItem value="P">P</MenuItem>
            <MenuItem value="F">F</MenuItem>
            <MenuItem value="C">C</MenuItem>
          </Select>
        </FormControl>
      </Lista>

      <Lista>{renderPedidos()}</Lista>
    </>
  );
}

export default Pedidos;
