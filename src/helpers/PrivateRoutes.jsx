import {Navigate} from "react-router-dom";
import Apis from "../constants/Apis";

const PrivateRoute = ({element}) => {
    const ME = sessionStorage.getItem("ME");
    const token = localStorage.getItem("AUTH_TOKEN");

    if (ME && token) {
        return element;
    } else if (token) {
            fetch(Apis.tokenLogin, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({token: token})
            }).then(async (res) => {
                if (res.ok) return res.json();
                throw new Error(await res.text());
            }).then((data) => {
                sessionStorage.setItem("ME", JSON.stringify(data["user"]));
                localStorage.setItem("AUTH_TOKEN", data["token"]);
                return element;
            }).catch((err) => {
                console.error(err);
                return <Navigate to="/authentication" replace />
            });
    } else {
            return <Navigate to="/authentication" replace />
    }
}

export default PrivateRoute;