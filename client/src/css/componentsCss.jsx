import styled from "@emotion/styled";

const Lista = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  marginBottom: '5px'
})

const Titulo = styled('h1')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: '5px'
})

const ContenedorForm = styled('div')({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  alignItems: "center",
})

const ContenedorFormWithBoderOneColumn = styled('div')({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  alignItems: "center",
  border: "1px solid black",
  borderRadius: "10px",
  width: "30%",
  boxShadow: "0 0 6px "
})

const ContenedorGlobalFormDosColumnas = styled('div')({
  display: "grid",
  placeItems: "center",
  gridTemplateColumns: "1fr 1fr",
  gap: "10px",
  border: "1px solid black",
  borderRadius: "10px",
  width: "50%",
  boxShadow: "0 0 6px ",
})
const ContenedorGlobalFormDosColumnasPedido = styled('div')({
  display: "grid",
  placeItems: "center",
  gridTemplateColumns: "1fr 1fr",
  //gap: "10px",

  //width: "50%",
 
})


const ContenedorSimpleCamposPequeño = styled('div')({

  display: "flex",
  flexDirection: "column",
  gap: "10px",
  alignItems: "center",
  padding: "20px",

})
const ContenedorLineal = styled('div')({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  //gap: "10px",
  //padding: "20px",
})
const ContenedorLinealSimpleCamposPequeño = styled('div')({

  display: "flex",
  flexDirection: "row",
  gap: "10px",
  alignItems: "center",
  padding: "20px",

})

const ContenedorComplejoCamposAmplios = styled('div')({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  alignItems: "center",
  padding: "20px",
})

const ButtonDisplayFormBotonera = styled('div')({
  display: "flex",
  gap: "10px",
  justifyContent: "space-between",
  padding: "10px",
})

// CSS para la ventana modal:
const ModalContainer = styled('div')({
  display: "flex",
  flexDirection: "column",
  alignItems: "center"

})

const ModalCloseButton = styled('div')({
  display: "flex",
  justifyContent: "flex-end"
})

const Pragraph = styled('p')({
  margin: "5px",
  fontWeight: "bold"
})

const styleModal = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  borderRadius: '20px',
  p:2

};

// CSS  para la barra de busqueda de cada vista de la app
const BarraGeneralDeBusqueda = styled('div')({
  display: 'grid',
  gridTemplateColumns: '3fr 1fr',

})

const CombinacionDeBarraYBotones = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginLeft: '10px',
})

//BootonParaRedirigirAFormulario
const ButtonAggregar = {
  margin: '10px',
  padding: '10px'
}

//Espacio entre los botones
const Espaciado = styled('div')({
  display: 'flex',
  justifyContent: 'space-around',
});


//Componente que despliega un modal al querer eliminar un registro
const FullMessage = styled('div')({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center"

})
//Componente que despliega un mensaje de pregunta al querer eliminar un registro
const JustMessage = styled('div')({
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
})
//Componente que incluyen los botones eliminar y cancelar en un modal
const MessageButton = styled('div')({
  display: "flex",
  justifyContent: "space-around",

})


//CSS para el formulario de mas informacion
//Componente en donde se despliega el dato
const Label = styled("div")({
  paddingTop: "2%",
})
//Componente donde se despliga el nombre que tendra el dato
const LabelSet = styled("div")({
  paddingTop: "2%",
  fontWeight: "bold",
})

//Contenedor que se encarga almacenar la informacion de una descripcion, direccion o 
//cualquier informacion que sean extensas
const ContenedorDescriptivo = styled("div")({
  display: "grid",
  gridTemplateColumns: "1fr ",
  textAlign: "center",
  paddingRight: "5%",
  paddingLeft: "5%",
  paddingBottom: "3%",

})

const FormularioMasInformacion = styled("div")({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  textAlign: "center",
});

const CarritoPrincipal = styled("div")({
  display: "flex",
  gap: "10px",
  alignItems: "center",
});
const Columna1 = styled("div")({
  flex: 1,
});
const Columna2 = styled("div")({
  flex: 1,
});



export {
  Lista,
  Titulo,
  ContenedorForm,
  ContenedorFormWithBoderOneColumn,
  ContenedorGlobalFormDosColumnas,
  ContenedorSimpleCamposPequeño,
  ContenedorComplejoCamposAmplios,
  ButtonDisplayFormBotonera,
  ModalContainer,
  ModalCloseButton,
  Pragraph,
  styleModal,
  BarraGeneralDeBusqueda,
  CombinacionDeBarraYBotones,
  ButtonAggregar,
  Espaciado,
  FullMessage,
  JustMessage,
  MessageButton,
  Label,
  LabelSet,
  ContenedorDescriptivo,
  FormularioMasInformacion,
  CarritoPrincipal,
  Columna1,
  Columna2,
  ContenedorLineal,
  ContenedorLinealSimpleCamposPequeño,
  ContenedorGlobalFormDosColumnasPedido
}
