import {
    Titulo,
    FormularioMasInformacion,
    Label,
    LabelSet,
    ContenedorDescriptivo
} from "../css/componentsCss.jsx";

function ProductoEspecifico({producto}) {
    return(
        <>
            <Titulo>Producto</Titulo>
            <FormularioMasInformacion>
                <LabelSet>Proveedor:</LabelSet>
                <Label>{producto.proveedor.nombre} {producto.proveedor.apellido}</Label>
                <LabelSet>Referencia:</LabelSet>
                <Label>{producto.referencia}</Label>
                <LabelSet>Tamaño:</LabelSet>
                <Label>{producto.tamanho}</Label>
                <LabelSet>Referencia Color:</LabelSet>
                <Label>{producto.color.referenciaColor}</Label>
                <LabelSet>Color:</LabelSet>
                <Label>{producto.color.color}</Label>
                <LabelSet>Precio Compra:</LabelSet>
                <Label>{producto.precio_compra}</Label>
                <LabelSet>Precio Venta:</LabelSet>
                <Label>{producto.precio_venta}</Label>
                <LabelSet>Stock:</LabelSet>
                <Label>{producto.stock}</Label>
            </FormularioMasInformacion>
            <ContenedorDescriptivo>
                <LabelSet>Descripcion:</LabelSet>
                <Label>{producto.descripcion}</Label>
            </ContenedorDescriptivo>


        </>
    )
}

export default ProductoEspecifico;