import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element }) => {
    return localStorage.getItem("AUTH_TOKEN") ? element : <Navigate to="/authentication" replace />;
}

export default PrivateRoute;