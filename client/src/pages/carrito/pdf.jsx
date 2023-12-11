import React from "react";
import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";

const PDF = ({ recibeData }) => {
  const styles = StyleSheet.create({
    body: {
      paddingTop: 35,
      paddingBottom: 65,
      paddingHorizontal: 35,
      textAlign: "center",
    },
    table: {
      border: 1,
      textAlign: "center",
      width: "100%",
    },
    row: {
      display: "flex",
      flexDirection: "row",
      borderTop: "1px solid #EEE",
      // paddingTop: 8,
      // paddingBottom: 8,
    },
    row22: {
      borderTop: "none",
      borderBottomWidth: 0.5,
      borderBottomColor: "#112131",
      borderBottomStyle: "solid",
    },
    header: {
      backgroundColor: "#adadad",
      borderTop: "none",
      borderBottomWidth: 2,
      borderBottomColor: "#112131",
      borderBottomStyle: "solid",
    },
    header2: {
      backgroundColor: "#d3d3d3",
      borderTop: "none",
      borderBottomWidth: 2,
      borderBottomColor: "#112131",
      borderBottomStyle: "solid",
    },
    bold: {
      fontWeight: "bold",
    },

    row1: {
      fontSize: 12,
      borderLeftWidth: "1",
      width: "33%",
    },
    row2: {
      fontSize: 12,
      borderLeftWidth: "1",
      width: "33%",
    },
    row3: {
      fontSize: 12,

      width: "33%",
      borderLeftWidth: "1",
    },
    row4: {
      fontSize: 12,
      borderRight: "none",
      // left, right,
      width: "33%",
      borderLeftWidth: "1",
    },
    row5: {
      fontSize: 12,
      borderLeftWidth: "1",
      // border
      // backgroundColor: 'red',
      height: "100%",
      width: "33%",
    },
  });
  /*
        backgroundColor: Establece el color de fondo.
        color: Establece el color del texto.
        fontSize: Establece el tamaño de fuente.
        fontWeight: Establece el grosor de la fuente (por ejemplo, 'bold' para negrita).
        textAlign: Establece la alineación del texto.
        margin: Establece los márgenes alrededor del elemento.
        padding: Establece el espacio de relleno dentro del elemento.
        border: Establece el estilo, ancho y color del borde.
        height: Establece la altura del elemento.
        width: Establece el ancho del elemento.
        display: Establece el tipo de visualización ('flex', 'block', 'inline-block', etc.).
        position: Establece el tipo de posicionamiento ('relative', 'absolute', 'fixed', etc.).
        top, bottom, left, right: Establece la posición del elemento.
        overflow: Establece el comportamiento de desbordamiento del contenido.
        Estos son solo algunos ejemplos de las propiedades que se pueden utilizar en un objeto de estilo en línea en React. Puedes consultar la documentación de CSS para obtener una lista completa de todas las propiedades y sus valores posibles.
        
        Recuerda que las propiedades deben estar en formato camelCase (por ejemplo, backgroundColor en lugar de background-color) y los valores deben ser cadenas de texto.
        */

  //-----------------------------------------------------------

  return (
    <Document>
      <Page
        size="A4"
        title={"pdfUrl"}
        style={styles.body}
        author={"Gabriel"}
        fileName="mi-archivo.pdf"
        encoding="utf-8"
      >
        <View style={styles.table}>
          {recibeData.map((carrito) => (
            <View key={carrito.productoId}>
              <View key={carrito.id} style={(styles.row, styles.row22)}>
                <View style={styles.row1}>
                  <Text>{carrito.productoId}</Text>

                  <Text>{carrito.cantidad}</Text>
                </View>
              </View>
            </View>
          ))}
          {/*             
          {data.map((row) => (
            <View key={row.productoId}>
              <View key={row.productoId} style={[styles.row, styles.row22]}>
                <View style={styles.row1}>
                  <Text>{row.descripcion}</Text>
                </View>
                <View style={styles.row1}>
                  <Text>{row.tipo}</Text>
                </View>
                <View style={styles.row1}>
                  <Text>{row.subtipo}</Text>
                </View>
                <View style={styles.row1}>
                  <Text>{row.tamanho}</Text>
                </View>
                <View style={styles.row1}>
                  <Text>
                    {row.precio.toLocaleString("es-PY", {
                      style: "currency",
                      currency: "PYG",
                    })}
                  </Text>
                </View>
                <View style={styles.row1}>
                  <Text>{row.cantidad}</Text>
                </View>
                <View style={styles.row1}>
                  <Text>
                    {" "}
                    {(row.precio * row.cantidad).toLocaleString("es-PY", {
                      style: "currency",
                      currency: "PYG",
                    })}
                  </Text>
                </View>
              </View>
            </View>
          ))}
          <View style={styles.row1}>
            <Text>
              Total :
              {totalCarrito.toLocaleString("es-PY", {
                style: "currency",
                currency: "PYG",
              })}
            </Text>
          </View> */}
        </View>
      </Page>
    </Document>
  );
};

export default PDF;
