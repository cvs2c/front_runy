import { useProductos } from "../../context/productoContext.jsx";
import { useCarrito } from "../../context/carritoContext.jsx";
import { useState, useEffect, useDebugValue } from "react";
import CardPedidoTicket from "../../components/cardPedidoTicket.jsx";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import { autoTable } from "jspdf-autotable";
import ReceiptIcon from '@mui/icons-material/Receipt';
import {
  Button,
  TextField,
  Modal,
  Box,
  IconButton,
  Autocomplete,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  Grid,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import {
  Titulo,
  ModalCloseButton,
  ModalContainer,
  Pragraph,
  styleModal,
  ContenedorForm,
  ContenedorGlobalFormDosColumnas,
  ContenedorSimpleCamposPequeño,
  ContenedorComplejoCamposAmplios,
  ContenedorFormWithBoderOneColumn,
  ButtonDisplayFormBotonera,
  CarritoPrincipal,
  Columna1,
  Columna2,
  Lista,
  Espaciado
} from "../../css/componentsCss.jsx";

function PedidosTicket() {
  const { carrito, listarPedido } = useCarrito();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  //El id es de tipo number
  const id = parseInt(searchParams.get("id"));

  useEffect(() => {
    listarPedido(id);
  }, []);

  // useEffect(()=>{
  //     console.log('carrito', carrito);
  // }, [carrito])

  function renderPedido() {
    if (carrito.length === 0) return <p>No hay pedidos</p>;
    return <CardPedidoTicket pedidos={carrito} />;
  }
  //   const totalPrecio = carrito.reduce((total, item) => total + item.precio, 0);

  //   useEffect(() => {
  //     console.log(totalPrecio);
  //   }, []);

  const generarPdf = () => {
    const doc = new jsPDF();
    doc.text("Runy Atelier", 90, 20);

    const columns = ["Producto", "Cantidad", "Precio"];

    const totalPrecio = carrito.reduce((total, item) => total + item.precio, 0);

    doc.autoTable({
      startY: 30,
      head: [columns],
      body: createTableBody(carrito),
      theme: "grid",
      styles: {
        head: {
          fillColor: [64, 64, 64],
          textColor: 255,
          fontStyle: "bold",
          halign: "center", // Centrar horizontalmente el texto en la cabecera
        },
        body: {
          halign: "center", // Centrar horizontalmente el texto en el cuerpo
        },
      },
    });
    // Calcular la sumatoria de los precios

    // Agregar una fila al final con el total y la sumatoria de los precios
    // doc.autoTable({
    //   body: [[totalPrecio]],
    //   theme: "grid",
    //   startY: doc.autoTable.previous.finalY, // Espaciado después de la tabla
    // });

    doc.save("ticket.pdf");
  };

  function createTableBody(data) {
    const body = [];

    // Iterar sobre el carrito
    data.forEach((item) => {
      const rowData = [
        item.producto.descripcion, // Descripción
        item.cantidad, // Cantidad
        item.precio + " Gs", // Precio
      ];

      body.push(rowData); // Agregar cada fila de datos al cuerpo de la tabla
    });

    return body;
  }

  return (
    <>
      <Titulo>TICKET</Titulo>
      <Lista>{renderPedido()}</Lista>
      <br/>
      <Lista>
        
        <Button variant="contained" color="primary" onClick={generarPdf}>
        <ReceiptIcon
                              fontSize="medium"
                              sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            />
        </Button>
        <Link to = "/pedidos">
          <Button variant="outlined" color="error">
            Cancelar
          </Button>
        </Link>
    
      </Lista>
    </>
  );
}

export default PedidosTicket;
