import React from "react";
import { useSelector as userSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Protected = ({children}) => {

    const user = userSelector((state) => state.auth.user);
    const loading = userSelector((state) => state.auth.loading);

    if(loading) {
        return <div>Loading....</div>
    }
    if(!user) {
        return <Navigate to="/login" replace />
    }
    return children;
}
export default Protected;