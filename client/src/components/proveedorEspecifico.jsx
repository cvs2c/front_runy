import styled from "@emotion/styled";

const Titulo = styled("div")({
    fontSize: "40px",
    fontWeight: "bold",
    display: "flex",
    justifyContent: "center",
});


const Formulario = styled("div")({
    display: "grid",
    gridTemplateColumns: "1fr 1fr",

    textAlign: "center",
});

const Label = styled("div")({
    paddingTop: "2%",
})

const LabelSet = styled("div")({
    paddingTop: "2%",
    fontWeight: "bold",
})

const Direccion = styled("div")({
    display: "grid",
    gridTemplateColumns: "1fr ",
    textAlign: "center",
    paddingRight: "5%",
    paddingLeft: "5%",
    paddingBottom: "3%",

})
function ProveedorEspecifico({proveedor}) {
    
    return(
        <>
            <Titulo>{proveedor.nombre} {proveedor.apellido}</Titulo>
            <Formulario>
                <LabelSet>Empresa:</LabelSet>
                <Label>{proveedor.empresa}</Label>
                <LabelSet>Telofono:</LabelSet>
                <Label>{proveedor.telefono}</Label>
                <LabelSet>Correo:</LabelSet>
                <Label>{proveedor.correo}</Label>       
            </Formulario>
            <Direccion>
                <LabelSet>Productos:</LabelSet>
                <Label>{proveedor.productos}</Label>
                <LabelSet>Direccion:</LabelSet>
                <Label>{proveedor.direccion}</Label>
            </Direccion>
        </>
    )

}


export default ProveedorEspecifico;