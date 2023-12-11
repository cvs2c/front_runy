import { createContext } from "react";
import { UsuarioContextProvider } from "./usuariosContext";
import { ProveedorContextProvider } from "./proveedorContext";
import { ClienteContextProvider } from "./clienteContext";
import { ProductoContextProvider } from "./productoContext";
import { ColorContextProvider } from "./colorContext";
import { PedidoContextProvider } from "./pedidoContext";
import { CarritoContextProvider } from "./carritoContext";
import { CompraContextProvider } from "./compraContext";

export const PrincipalContext = createContext();

export const usePrincipal = () => {
  const context = use(ContextGlob);
  if (!context) {
    throw new Error("use must be used within a ContextProvider");
  }
  return context;
};

export const PrincipalContextProvider = ({ children }) => {
  return (
    <UsuarioContextProvider>
      <ProveedorContextProvider>
        <ClienteContextProvider>
          <ProductoContextProvider>
            <ColorContextProvider>
              <PedidoContextProvider>
                <CarritoContextProvider>
                  <CompraContextProvider>{children}</CompraContextProvider>
                </CarritoContextProvider>
              </PedidoContextProvider>
            </ColorContextProvider>
          </ProductoContextProvider>
        </ClienteContextProvider>
      </ProveedorContextProvider>
    </UsuarioContextProvider>
  );
};
