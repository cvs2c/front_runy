import Button from "@mui/material/Button";
import { useUsuarios } from "../context/usuariosContext";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { usePedidos } from "../context/pedidoContext.jsx";
import CardHome from "../components/cardHome.jsx";
import {
  Lista,
  Titulo,
  ButtonAggregar,
  BarraGeneralDeBusqueda,
  CombinacionDeBarraYBotones,
} from "../css/componentsCss.jsx";

import {
  Autocomplete,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";

function Home() {
  const {
    listarPedidos,
    pedidos,
    listarPedidosPendientes,
    listarPedidosFinalizados,
    listarPedidoCompletados,
    variableCambio,
    setVariableCambio,
  } = usePedidos();


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
      listarPedidosPendientes();
    }
  }, [estadoPedido.estado, variableCambio]);

  useEffect(() => {
    console.log("valor filtrado: ", pedidos);
  }, [pedidos]);

  function renderPedidos() {
    if (pedidos.length === 0) return <h2> No hay pedidos</h2>;
    return <CardHome pedidos={pedidos} />;
  }

  return (
    <div>
      <Titulo>PENDIENTES</Titulo>
   
      <Lista>{renderPedidos()}</Lista>
    </div>
  );
}

export default Home;
