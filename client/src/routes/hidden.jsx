import React from "react";
import { Navigate, Outlet } from "react-router-dom";

import { useUsuarios } from "../context/usuariosContext";

const HiddenPath = ({isHidden, redirect = "/",children})=>{
    const {userLogged} = useUsuarios();
    if(!isHidden){
        return <Navigate to={redirect} replace/>;

    }

    isHidden = !Object.keys(userLogged).length>0;

    if(isHidden){
        return <Navigate to={redirect} replace/>;
    }

    return children ? children:<Outlet/>
};

export {
    HiddenPath
};