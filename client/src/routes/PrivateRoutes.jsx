import { Navigate, Route, Routes } from 'react-router-dom';
import { useUsuarios } from '../context/usuariosContext.jsx';

function PrivateRoute({ element, ...rest }) {
  const { userLogged } = useUsuarios();

  useEffect(() => {
      
  })


  return userLogged ? (
    <Route {...rest} element={element} />
  ) : (
    <Navigate to="/" replace />
  );
}

export default PrivateRoute;