import React from "react"
import { useNavigate } from 'react-router-dom';
import Apis from "../constants/Apis";

export const Login = () => {
    const navigate = useNavigate();
    const initState = {
        email: "",
        password: ""
    };
    const [data, setData] = React.useState(initState);
    const [checked, setChecked] = React.useState(true);

    const login = (e) => {
        e.preventDefault();
        fetch(Apis.login, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }).then(async (res) => {
            if (res.ok) return res.json();
            throw new Error(await res.text());
        }).then((data) => {
            if (checked) {
                localStorage.setItem("AUTH_TOKEN", data['token']);
            }
            sessionStorage.setItem("ME", JSON.stringify(data['user']));
            navigate('/dashboard', { replace: true });
        }).catch((e) => alert(e.message));
    }
    return (
        <form className="authenticationForm" onSubmit={login}>
            <input className="textBox" type="email" name="email" placeholder="Enter Email" required value={data.email} onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })} />
            <input className="textBox" type="password" name="password" placeholder="Enter Password" required value={data.password} onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })} />
            <label><input id="keepLoggedIn" type="checkbox" checked={checked} onChange={(e) => setChecked(!checked)} /> Keep me logged in</label>
            <button type="submit" className="authenticateBtn positiveBtn">Log In</button>
        </form>
    )
}