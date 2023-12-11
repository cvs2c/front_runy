import { useState, useEffect } from "react";
import { useCarrito } from "../../context/carritoContext.jsx";
import CardVentas from "../../components/cardVentas.jsx";
import { jsPDF } from "jspdf";
import { autoTable } from "jspdf-autotable";
import { Link, useActionData, useLocation, useNavigate } from "react-router-dom";
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
    Lista
} from "../../css/componentsCss.jsx";

function Ventas() {

    const { listarVentas, ventas  } = useCarrito();

    const [formData, setFormData] = useState({
        total: ''
    });

    useEffect(()=>{

        listarVentas();

    },[])

    // useEffect(()=>{

    //     let totalCarrito = 0;

    //     for(let i = 0; i < carrito.length; i++){
    //         totalCarrito = totalCarrito + carrito[i].totalPrecio;
    //     }

    //     setFormData({
    //         total: totalCarrito
    //     })

    // },[carrito])

    useEffect(()=>{

        // console.log(carrito);
        let totalCarrito = 0;

        ventas.forEach(item => {
            const precio = parseInt(item.totalPrecio);
            totalCarrito = totalCarrito + precio;
            console.log(precio);
        });

        // console.log(totalCarrito);
        setFormData({
            total: totalCarrito
        })

    }, [ventas])


    function createTableBody(data) {
        const body = [];
    
        // Iterar sobre el carrito
        data.forEach((item) => {
          const rowData = [
            item.producto.referencia, // Descripción
            item.producto.tamanho,
            item.producto.color.color,
            item.totalCantidad, // Cantidad
            item.totalPrecio + " Gs", // Precio
          ];
    
          body.push(rowData); // Agregar cada fila de datos al cuerpo de la tabla
        });
    
        return body;
      }

    const generarPdf = () => {
        const doc = new jsPDF();
        doc.text("Runy Atelier", 90, 20);
    
        const columns = ["Referencia", "Tamaño", "Color", "Cantidad","Monto"];
    
        // const totalPrecio = carrito.reduce((total, item) => total + item.precio, 0);
    
        doc.autoTable({
          startY: 30,
          head: [columns],
          body: createTableBody(ventas),
          theme: "striped",
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
    
        doc.save("Informe_Venta.pdf");
      };



    function renderVentas() {
        if(ventas.length === 0) return <p>No hay ventas</p>
        return <CardVentas ventas={ventas} />
    }

    return(
        <>
        <Titulo>VENTAS</Titulo>
        <Lista>{renderVentas()}</Lista>
        <br/>
        <Lista>
        <TextField
            id="outlined-multiline-flexible"
            label="Total"
            multiline
            maxRows={4}
            value={formData.total}
            // onChange={(e) => setFormData({ ...formData, total: e.target.value })}
        />
        </Lista>
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
    
      </Lista>
        </>
    )
}

export default Ventas;