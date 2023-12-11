import { useEffect, useState } from "react";
import { useProductos } from "../../context/productoContext.jsx";
import { useProveedor } from "../../context/proveedorContext.jsx";
import { useColor } from "../../context/colorContext.jsx";
import { Link, useLocation } from "react-router-dom";
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
} from "../../css/componentsCss.jsx";

function ProductoForm() {
  const {
    registrarProducto,
    errors,
    setErrors,
    listarProducto,
    actualizarProducto,
  } = useProductos();
  const { proveedores, listarProveedores, listarProveedor } = useProveedor();
  const { colores, listarColores, listarColor } = useColor();

  const [open, setOpen] = useState(false);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = parseInt(searchParams.get("id"));

  const handleClose = () => {
    setOpen(false);
  };

  const [formData, setFormData] = useState({
    proveedorId: "",
    referencia: "",
    colorId: "",
    tamanho: "",
    precio_compra: "",
    precio_venta_normal: "",
    precio_venta_personalizado: "",
    descripcion: "",
    stock: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const [selectedProveedor, setSelectedProveedor] = useState(null);
  const ProveedorChange = (e, value) => {
    setSelectedProveedor(value);
    const proveedorIdValue = value.id;
    setFormData({
      ...formData,
      proveedorId: proveedorIdValue,
    });
  };

  const [selectedColor, setSelectedColor] = useState(null);

  const ColorChange = (e, value) => {
    setSelectedColor(value);
    const colorIdValue = value.id;
    setFormData({
      ...formData,
      colorId: colorIdValue,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await actualizarProducto(id, formData);
    } else {
      await registrarProducto(formData);
    }
  };

  const handleResetForm = () => {
    setFormData({
      proveedorId: "",
      referencia: "",
      colorId: "",
      tamanho: "",
      precio_compra: "",
      precio_venta_normal: "",
      precio_venta_personalizado: "",
      descripcion: "",
      stock: "",
    });
    setSelectedProveedor(null);
    setSelectedColor(null);
  };

  useEffect(() => {
    if (id) {
      const cargarProducto = async () => {
        const response = await listarProducto(id);
        console.log(response);
        setFormData((prevState) => ({
          ...prevState,
          proveedorId: response.proveedorId,
          referencia: response.referencia,
          colorId: response.colorId,
          tamanho: response.tamanho,
          stock: response.stock,
          precio_compra: response.precio_compra,
          precio_venta_normal: response.precio_venta_normal,
          precio_venta_personalizado: response.precio_venta_personalizado,
          descripcion: response.descripcion,
          size: response.tamano,
        }));
        const responseproveedor = await listarProveedor(response.proveedorId);
        setSelectedProveedor(responseproveedor);
        const responsecolor = await listarColor(response.colorId);
        setSelectedColor(responsecolor);
      };
      cargarProducto();
    }

    if (errors.length > 0) {
      setOpen(true);
    } else {
      handleResetForm();
    }

    listarProveedores();
    listarColores();
  }, [errors]);

  return (
    <>
      <Titulo>{id ? "MODIFICAR PRODUCTO" : "REGISTRAR PRODUCTO"}</Titulo>

      <form onSubmit={handleSubmit}>
        <ContenedorForm>
          <ContenedorGlobalFormDosColumnas>
            <ContenedorSimpleCamposPequeño>
              <Autocomplete
                id="proveedor-autocomplete"
                name="proveedorId"
                onChange={ProveedorChange}
                options={proveedores}
                getOptionLabel={(option) =>
                  option.nombre + " " + option.apellido + " " + option.empresa
                }
                value={selectedProveedor}
                style={{ width: 230 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Proveedor"
                    variant="filled"
                    value={formData.proveedorId}
                  />
                )}
              />

              <TextField
                name="referencia"
                label="Referencia"
                variant="filled"
                value={formData.referencia}
                onChange={handleChange}
              />

              <Autocomplete
                id="color-autocomplete"
                name="colorId"
                onChange={ColorChange}
                options={colores}
                getOptionLabel={(option) =>
                  option.referenciaColor + " " + option.color
                }
                style={{ width: 230 }}
                value={selectedColor}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Color"
                    variant="filled"
                    value={formData.colorId}
                  />
                )}
              />

              <FormControl>
                <InputLabel id="select-label">Selecciona el tamaño</InputLabel>
                <Select
                  name="tamanho"
                  label="Tamaño"
                  variant="filled"
                  value={formData.tamanho}
                  onChange={handleChange}
                  style={{ width: "230px" }}
                >
                  <MenuItem value="30x45cm">30x45cm</MenuItem>
                  <MenuItem value="90x70cm">90x70cm</MenuItem>
                  <MenuItem value="45x70cm">45x70cm</MenuItem>
                  <MenuItem value="70x140cm">70x140cm</MenuItem>
                  <MenuItem value="50x80cm">50x80cm</MenuItem>
                  <MenuItem value="41x60cm">41x60cm</MenuItem>

                </Select>
              </FormControl>

              <TextField
                name="stock"
                label="Stock"
                variant="filled"
                value={formData.stock}
                onChange={handleChange}
              />
            </ContenedorSimpleCamposPequeño>
            <ContenedorSimpleCamposPequeño>
              <TextField
                name="descripcion"
                label="Descripción"
                variant="filled"
                multiline
                rows={4}
                value={formData.descripcion}
                onChange={handleChange}
              />
              <TextField
                name="precio_compra"
                label="Precio de Compra"
                variant="filled"
                value={formData.precio_compra}
                onChange={handleChange}
              />

              <TextField
                name="precio_venta_normal"
                label="Precio de Venta "
                variant="filled"
                value={formData.precio_venta_normal}
                onChange={handleChange}
              />
              <TextField
                name="precio_venta_personalizado"
                label="Precio Personalizado"
                variant="filled"
                value={formData.precio_venta_personalizado}
                onChange={handleChange}
              />
            </ContenedorSimpleCamposPequeño>
            <ButtonDisplayFormBotonera>
              <Button
                type="submit"
                variant="contained"
                size="large"
                color="success"
                sx={{ fontWeight: "bold" }}
              >
                {id ? "Editar" : "Crear"}
              </Button>
            </ButtonDisplayFormBotonera>
            <ButtonDisplayFormBotonera>
              <Link to="/productos">
                <Button
                  variant="outlined"
                  size="large"
                  color="error"
                  onClick={() => setErrors([])}
                  sx={{ fontWeight: "bold" }}
                >
                  Cancelar
                </Button>
              </Link>
            </ButtonDisplayFormBotonera>
          </ContenedorGlobalFormDosColumnas>
        </ContenedorForm>
      </form>

      <Modal open={open} onClose={handleClose} aria-labelledby="ERROR">
        <Box sx={styleModal}>
          <ModalCloseButton>
            <IconButton
              onClick={handleClose}
              sx={{
                p: 0,
                background: "none",
                border: "none",
                "&:hover": { color: "error.main" },
              }}
            >
              <CancelIcon />
            </IconButton>
          </ModalCloseButton>

          <ModalContainer>
            <h1>ERROR</h1>
            {errors.map((error, index) => (
              <Pragraph key={index}>{error}</Pragraph>
            ))}
          </ModalContainer>
        </Box>
      </Modal>
    </>
  );
}

export default ProductoForm;
