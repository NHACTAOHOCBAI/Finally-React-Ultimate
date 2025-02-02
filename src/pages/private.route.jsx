import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../components/context/auth.context";

const PrivateRoute = (props) => {
    const { user } = useContext(AuthContext);
    if (user && user.id) {
        return (
            <>
                {props.children}
            </>
        )
    }
    return (<Navigate to="/login" replace />)
}
export default PrivateRoute