import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { PrincipalContextProvider } from './context/principalContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  //? El BrowserRouter permite que exista el enrutamiento del lado del servidor
  <React.StrictMode>
    <BrowserRouter>

      <PrincipalContextProvider>
        <App />
      </PrincipalContextProvider>

    </BrowserRouter>
  </React.StrictMode>
)
