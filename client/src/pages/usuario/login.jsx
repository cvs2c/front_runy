import { Formik, Form } from "formik";
import { useUsuarios } from "../../context/usuariosContext.jsx";
import { useState, useEffect } from "react";
// import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material";
import logo from "../../assets/logo.jpg";
import { AccountCircle, Lock} from "@mui/icons-material";
import { Button, Modal, Box, TextField, IconButton } from "@mui/material";
 import CancelIcon from '@mui/icons-material/Cancel';
import {
  Titulo,
  ContenedorForm,
  ContenedorFormWithBoderOneColumn,
  ContenedorSimpleCamposPequeño,
  ButtonDisplayFormBotonera,
  ModalContainer,
  ModalCloseButton,
  Pragraph,
  styleModal,
} from "../../css/componentsCss.jsx";

const LoginContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  backgroundColor: "#f5ecea",
});

const BorderLogin = styled("div")({
  display: "flex",
  border: "1px black",
  borderRadius: "10px",
  backgroundColor: "white",
  boxShadow: "5px 5px 5px gray",
});

const LoginElement = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "10px",
  padding: "20px",
  textAlign: "center", // Add this line to center-align the content
});

const LoginForm = styled("form")({
  display: "flex",
  flexDirection: "column",
  gap: "5px",
  alignItems: "center",
});

function login() {
  const { crearSession, userLogged, userError, setUserError } = useUsuarios();

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
    setUserError([]);
  };

  const [usuario, setUsuario] = useState({
    user: "",
    password: "",
  });

  useEffect(() => {
    if (!!userLogged) {
      navigate("/home");
    }
  }, [userLogged, navigate]);

  useEffect(() => {
    if (userError.length > 0) {
      setOpen(true);
    }
  }, [userError]);

  return (
    <LoginContainer>
      <BorderLogin>
        <img
          src={logo}
          alt="Logo"
          className="logo"
          style={{ width: "500px", height: "400px" }}
        />
        <LoginElement>
          <div>
            <h1 sx={{ marginTop: "50px" }}>Login</h1>
            <Formik
              initialValues={usuario}
              onSubmit={async (values, actions) => {
                await crearSession(values);
                actions.resetForm();
              }}
            >
              {({ handleChange, handleSubmit, values }) => (
                <LoginForm onSubmit={handleSubmit}>
                  <AccountCircle /> <label>Usuario:</label>
                  <input
                    type="text"
                    name="user"
                    value={values.user}
                    placeholder="Usuario"
                    onChange={handleChange}
                  />
                  <Lock />
                  <label>Contraseña:</label>
                  <input
                    type="password"
                    name="password"
                    value={values.password}
                    placeholder="Contraseña"
                    onChange={handleChange}
                  />
                  <Button
                    sx={{ marginTop: "20px" }}
                    type="submit"
                    variant="contained"
                    color="success"
                  >
                    Iniciar Session
                  </Button>
                </LoginForm>
              )}
            </Formik>
          </div>
        </LoginElement>
      </BorderLogin>
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
            {/* {userError.map((Error, index) => ( */}
              <Pragraph> {userError}</Pragraph>
            {/* ))} */}
          </ModalContainer>
        </Box>
      </Modal>
    </LoginContainer>
  );
}

export default login;
