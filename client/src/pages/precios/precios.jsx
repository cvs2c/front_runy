import { useState, useEffect } from "react";
import { useProductos } from "../../context/productoContext.jsx";
import {
    Lista,
    Titulo,
    BarraGeneralDeBusqueda,
    CombinacionDeBarraYBotones
} from "../../css/componentsCss.jsx";
import { Button, Autocomplete, TextField } from "@mui/material";
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import CardPrecios from "../../components/cardPrecios.jsx";


function Precios() {

    const { productos, listarProductos } = useProductos();

    const [valorBuscado, setValorBuscado] = useState("None");

    const handleAutocompleteChange = (event, newValue) => {
        setValorBuscado(newValue);
    }

    useEffect(() => {
        if (valorBuscado === "None") {
            listarProductos();
        }else{
            listarProductos();
        }
            
        
        
    },[valorBuscado])


    function renderPrecios() {
        if(productos.length === 0) return <h2>No hay precios</h2>
        return <CardPrecios productos={valorBuscado !== "None" ? valorBuscado : productos} />
    }

    function filtrarPrecios(productos) {
        const uniqueCombos = new Set();
        return productos.filter((producto) => {
            const combo = producto.referencia + producto.tamanho ;
            if (uniqueCombos.has(combo)) {
                return false; // Skip duplicate combinations
            }
            uniqueCombos.add(combo);
            return true; // Keep unique combinations
        });
    }

    const productosPrecios = filtrarPrecios(productos);
 
    return (
        <>
        <Titulo>PRECIOS</Titulo>
        <Lista>
                <BarraGeneralDeBusqueda>

                <Autocomplete
                        multiple
                        id="lista-productos"
                        options={productosPrecios}
                        getOptionLabel={option => option.referencia +  " " + option.tamanho}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        onChange={handleAutocompleteChange}
                        sx={{ width: 450 }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                variant="standard"
                                label="Buscar Precio"
                                placeholder="Buscar Precio"

                            />
                        )}
                      
                    />

                    <CombinacionDeBarraYBotones>

                        <button variant="outlined" onClick={() => setValorBuscado("None")} ><RotateLeftIcon fontSize="medium" sx={{ display: "flex", justifyContent: "center", alignItems: "center" }} /></button>

                    </CombinacionDeBarraYBotones>
                </BarraGeneralDeBusqueda>
            </Lista>
        <Lista>
            {renderPrecios()}
        </Lista>
        </>
    )
}

export default Precios;