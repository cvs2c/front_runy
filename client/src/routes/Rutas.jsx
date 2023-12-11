import { Route, Routes } from "react-router-dom";
//! Los componentes Route y Routes permiten especificar las rutas que se utilizaran
//! y cual componente sera renderizado por la aplicacion
import { CssBaseline } from "@mui/material";
//! Aplica un conjunto basico de elementos CSS para normalizar el renderizado
//! a traves de los distintos buscadores.
import Login from "../pages/usuario/login";
import Home from "../pages/home.jsx";
import Proveedor from "../pages/proveedor/proveedor.jsx";
import Productos from "../pages/productos/productos.jsx";
import ProveedorForm from "../pages/proveedor/proveedorForm.jsx";
import Clientes from "../pages/clientes/clientes.jsx";
import ClientesForm from "../pages/clientes/clientesForm.jsx";
import ProductoForm from "../pages/productos/productosForm.jsx";
import Color from "../pages/colores/color.jsx";
import ColorForm from "../pages/colores/colorForm.jsx";
import Precios from "../pages/precios/precios.jsx";
import PreciosForm from "../pages/precios/preciosForm.jsx";
import Pedidos from "../pages/pedidos/pedido.jsx";
import PedidoForm from "../pages/pedidos/pedidoForm.jsx";
//import { PrincipalContextProvider } from '../context/principalContext.jsx';
import { HiddenPath } from "./hidden.jsx";
import { useUsuarios } from "../context/usuariosContext.jsx";
import { useEffect, useState } from "react";
import NavBar from "../components/navbar.jsx";
import Carrito from "../pages/carrito/carrito.jsx";
import CargarCarrito from "../pages/carrito/cargarCarrito.jsx";
import Compras from "../pages/compras/compras.jsx";
import ComprasForm from "../pages/compras/comprasForm.jsx";
import Ventas from "../pages/ventas/ventas.jsx";
import PedidosTicket from "../pages/pedidos/pedidoTicket.jsx";

//import PrivateRoute from './PrivateRoutes.jsx';

function Rutas() {
  const { userLogged, setUserLogged } = useUsuarios();

  useEffect(() => {
    setUserLogged(JSON.parse(sessionStorage.getItem("user")));
  }, []);

  return (
    <div>
      <CssBaseline />
      <NavBar />
      <Routes>
        {/* Ruta Raiz */}
        <Route path="/" element={<Login />} />

        {/* Ruta de prueba */}
        <Route element={<HiddenPath isHidden={!!userLogged} />}>
          <Route path="/home" element={<Home />} />

          <Route path="/proveedor" element={<Proveedor />} />
          <Route path="/proveedorForm" element={<ProveedorForm />} />

          <Route path="/productos" element={<Productos />} />
          <Route path="/productosForm" element={<ProductoForm />}></Route>

          <Route path="/clientes" element={<Clientes />}></Route>
          <Route path="/clientesForm" element={<ClientesForm />}></Route>

          <Route path="/colores" element={<Color />}></Route>
          <Route path="/coloresForm" element={<ColorForm />}></Route>

          <Route path="/precios" element={<Precios />}></Route>
          <Route path="/preciosForm" element={<PreciosForm />}></Route>

          <Route path="/pedidos" element={<Pedidos />}></Route>
          <Route path="/pedidosForm" element={<PedidoForm />}></Route>

          <Route path="/carrito" element={<Carrito />}></Route>
          <Route path="/cargarCarrito" element={<CargarCarrito />}></Route>

          <Route path="/compras" element={<Compras />}></Route>
          <Route path="/comprasForm" element={<ComprasForm />}></Route>

          <Route path="/ventas" element={<Ventas />}></Route>

          <Route path="/pedidosTicket" element={<PedidosTicket />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default Rutas;
