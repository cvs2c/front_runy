import { useProductos } from "../../context/productoContext.jsx";
import { useCarrito } from "../../context/carritoContext.jsx";
import { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

import { Link, useLocation, useNavigate } from "react-router-dom";
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
  ContenedorGlobalFormDosColumnasPedido,
  ContenedorSimpleCamposPequeño,
  ContenedorComplejoCamposAmplios,
  ContenedorFormWithBoderOneColumn,
  ButtonDisplayFormBotonera,
  CarritoPrincipal,
  Columna1,
  Columna2,
  ContenedorLineal,
  ContenedorLinealSimpleCamposPequeño,
  Lista,
} from "../../css/componentsCss.jsx";
import PDF from "./pdf.jsx";
import { PDFDownloadLink } from "@react-pdf/renderer";
import CardCarrito from "../../components/cardCarrito.jsx";

function CargarCarrito() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const pedidoid = parseInt(searchParams.get("id"));
  //el parametro recibe un id de valor tipo number

  const pedido = {
    pedidoId: pedidoid,
  };
  const { listarProductosStock, productosStock } = useProductos();
  const { carrito, setCarrito, registrarCarrito } = useCarrito();

  const Navigate = useNavigate();

  const [formData, setFormData] = useState({
    pedidoId: pedidoid,
    productoId: "",
    cantidad: "",
    personalizado: "P",
    precio: 0,
    descripcion: "",
    // total: 0,
  });

  const [totalData, setTotalData] = useState({
    total: 0,
  });

  useEffect(() => {
    let sumaPrecio = 0;

    carrito.forEach((item) => {
      sumaPrecio += item.precio;
    });

    setTotalData((prevState) => ({
      ...prevState,
      total: sumaPrecio,
    }));
  }, [carrito]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "cantidad" || name === "personalizado") {
      const selectedPrecio =
        selectedProducto && formData.personalizado === "N"
          ? selectedProducto.precio_venta_normal
          : selectedProducto && formData.personalizado === "P"
          ? selectedProducto.precio_venta_personalizado
          : "";

      const precio = selectedPrecio ? selectedPrecio * formData.cantidad : "";
      setFormData((prevState) => ({ ...prevState, precio }));
    }
  };

  // const handleEliminarItem = (index) => {
  //   // Actualiza el estado del carrito eliminando el elemento en el índice dado
  //   cargarCarrito((prevCarrito) => {
  //     const nuevoCarrito = [...prevCarrito];
  //     nuevoCarrito.splice(index, 1);
  //     return nuevoCarrito;
  //   });
  // };

  function renderCarrito() {
    if (carrito.length == 0) return <p>No hay productos en el carrito</p>;
    return <CardCarrito carrito={carrito} />;
  }

  const [selectedProducto, setSelectedProducto] = useState(null);
  const ProductoChange = (e, value) => {
    setSelectedProducto(value);
    setFormData((prevState) => ({
      ...prevState,
      productoId: value.id,
      cantidad: "",
      precio: "",
      personalizado: "P",
      descripcion: value.descripcion,
    }));
  };

  //const [carritoProvisorio, setCarritoProvisorio] = useState([]);

  //const insertInCarrito = (value) => {
  // setCarritoProvisorio((prevCarrito) => [...prevCarrito, value]);
  // setCarritoProvisorio(value);
  //};

  const handleSubmit = async (value) => {
    console.log(carrito);
    carrito.map(async (item) => {
      await registrarCarrito(item);
     
      //onsole.log(item);
    });

    setCarrito([]); //limpio el ARRAY

    Navigate("/pedidos");

    //await registrarCarrito(map.carrito);
  };

  //const [objeto, setObjeto] = useState([]);

  // const insertObjeto = (value1, value2, value3) => {
  // setCarritoProvisorio((prevCarrito) => [...prevCarrito, value]);
  //     const nuevoObjeto = Object.assign({}, value1, value2, value3);
  //     setObjeto(nuevoObjeto);
  //   };

  useEffect(() => {
    listarProductosStock();
  }, []);

  useEffect(() => {
    if (selectedProducto) {
      const selectedPrecio =
        formData.personalizado === "N"
          ? selectedProducto.precio_venta_normal
          : selectedProducto.precio_venta_personalizado;

      const precio = selectedPrecio ? selectedPrecio * formData.cantidad : "";
      setFormData((prevState) => ({ ...prevState, precio }));
    }
    console.log(selectedProducto);
  }, [selectedProducto, formData.cantidad, formData.personalizado]);

  //useEffect(() => {
  //  setFormData((prevState) => ({ ...prevState, total: formData.precio }));
  //}, [formData.precio]);

  // const [totalValue, setTotalValue] = useState(0);

  //   useEffect(() => {

  //       // Realizar acciones adicionales con el nuevo objeto aquí
  //       console.log("objetoNuevo:", objeto);

  //   }, [objeto]);
  // useEffect(() => {
  //   console.log("formData:", formData);
  // }, [formData]);

  useEffect(() => {
    console.log("carrito:", carrito);
  }, [carrito]);

  const agreagarCarrito = (item) => {
    setCarrito([...carrito, item]);

    setFormData({
      pedidoId: pedidoid,
      productoId: "",
      cantidad: "",
      personalizado: "P",
      precio: 0,
      // total: 0,
    });

    setSelectedProducto(null);
  };

  // const modificarTotal = (precio, totalActual) => {

  //   setFormData((prevState) => ({ ...prevState, total: precio + totalActual }));

  // };

  return (
    <>
      <Titulo>CARGAR CARRITO</Titulo>
      <CarritoPrincipal>
        <Columna1>
          <ContenedorForm>
            <ContenedorGlobalFormDosColumnasPedido>
              <ContenedorSimpleCamposPequeño>
                <Autocomplete
                  id="producto-autocomplete"
                  name="productoId"
                  onChange={ProductoChange}
                  options={productosStock}
                  getOptionLabel={(option) =>
                    `${option.referencia}  - ${option.tamanho} -  ${option.color.color}`
                  }
                  value={selectedProducto}
                  style={{ width: 250 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Producto"
                      variant="filled"
                      //key={params.inputProps["id"]}
                      value={formData.productoId}
                    />
                  )}
                />
                <TextField
                  name="productoReferencia"
                  label="Referencia"
                  variant="filled"
                  value={
                    selectedProducto === null ? "" : selectedProducto.referencia
                  }
                />
                <TextField
                  name="Tamanho"
                  label="Tamaño"
                  variant="filled"
                  value={
                    selectedProducto === null ? "" : selectedProducto.tamanho
                  }
                />
                <TextField
                  name="Color"
                  label="Tamaño"
                  variant="filled"
                  value={
                    selectedProducto === null
                      ? ""
                      : selectedProducto.color.color
                  }
                />
                <TextField
                  name="Precio_Normal"
                  label="Venta_S.P."
                  variant="filled"
                  value={
                    selectedProducto === null
                      ? ""
                      : selectedProducto.precio_venta_normal
                  }
                />
                <TextField
                  name="Precio_Personalizado"
                  label="Venta_P."
                  variant="filled"
                  value={
                    selectedProducto === null
                      ? ""
                      : selectedProducto.precio_venta_personalizado
                  }
                />
                <TextField
                  name="Stock"
                  label="Stock"
                  variant="filled"
                  value={
                    selectedProducto === null ? "" : selectedProducto.stock
                  }
                />
                <ButtonDisplayFormBotonera>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => {
                      //insertInCarrito(selectedProducto);
                      //console.log(carritoProvisorio);
                    }}
                  >
                    Selecccionar
                  </Button>
                </ButtonDisplayFormBotonera>
              </ContenedorSimpleCamposPequeño>
              <form onSubmit={handleSubmit}>
                <ContenedorSimpleCamposPequeño>
                  <TextField
                    name="cantidad"
                    label="Cantida"
                    variant="filled"
                    value={formData.cantidad}
                    onChange={handleChange}
                    style={{ color: selectedProducto?.stock < formData.cantidad ? 'red' : 'black' }}
                    inputProps={{
                      style: {
                        color:
                          selectedProducto?.stock < formData.cantidad
                            ? "red"
                            : "black",
                      },
                    }}
                  />

                  <FormControl>
                    <InputLabel id="select-label">Personalizado:</InputLabel>
                    <Select
                      name="personalizado"
                      label="Personalizado"
                      variant="filled"
                      value={formData.personalizado}
                      onChange={handleChange}
                      style={{ width: "250px" }}
                    >
                      <MenuItem value="P">P</MenuItem>
                      <MenuItem value="N">N</MenuItem>
                    </Select>
                  </FormControl>

                  <TextField
                    name="precio"
                    label="Precio"
                    variant="filled"
                    value={formData.precio}
                  />
                  <TextField
                    name="total"
                    label="Total"
                    variant="filled"
                    value={totalData.total}
                  />

                  <Button
                    variant="outlined"
                    color="primary"
                    disabled={
                      selectedProducto == null ||
                      selectedProducto?.stock < formData.cantidad
                        ? true
                        : false || formData.cantidad == 0
                        ? true
                        : false
                    }
                    onClick={() => {
                      //   insertObjeto(selectedProducto, formData, pedido);
                      //   console.log("objetoNuevo:", objeto);
                      // modificarTotal(formData.precio, formData.total);
                      agreagarCarrito(formData);
                    }}
                  >
                    <AddIcon
                      fontSize="medium"
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    />
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    variant="outlined"
                    color="success"
                    disabled={carrito.length === 0 ? true : false}
                  >
                    <AddShoppingCartIcon
                      fontSize="medium"
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    />
                  </Button>
                  <Link to="/pedidos">
                    <Button variant="outlined" color="error">
                      Cancelar
                    </Button>
                  </Link>
                </ContenedorSimpleCamposPequeño>
              </form>
            </ContenedorGlobalFormDosColumnasPedido>
          </ContenedorForm>
        </Columna1>
        <Columna2>
          <Lista>{renderCarrito()}</Lista>
        </Columna2>
      </CarritoPrincipal>
    </>
  );
}

export default CargarCarrito;

{
  /*
<Button variant="contained" color="primary">
<PDFDownloadLink
  style={{
    color: "white",
    textDecoration: "none",
    width: "100%",
    height: "100%",
  }}
  document={<PDF recibeData={carrito} />}
  // fileName={nombreCompras}
>
  {({ blob, url, loading, error }) =>
    loading ? "Generando Compra PDF..." : `Descargar Compra PDF`
  }
</PDFDownloadLink>
</Button>
*/
}
