import React from "react"
import { useNavigate } from 'react-router-dom';
import Apis from "../constants/Apis";
import {MdRefresh} from "react-icons/md";

export const Login = () => {
    const navigate = useNavigate();
    const initState = {
        email: "",
        password: ""
    };
    const [processing, setProcessing] = React.useState(false);
    const [data, setData] = React.useState(initState);
    const [checked, setChecked] = React.useState(true);

    const login = (e) => {
        setProcessing(true);
        e.preventDefault();
        fetch(Apis.login, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }).then(async (res) => {
            if (res.ok) return res.json();
            throw new Error(await res.text());
        }).then((res) => {
            if (checked) {
                localStorage.setItem("AUTH_TOKEN", res['token']);
            }
            sessionStorage.setItem("ME", JSON.stringify(res['user']));
            setProcessing(false);
            navigate('/dashboard', { replace: true });
        }).catch((e) => {
            setProcessing(false);
            alert(e.message);
        });
    }
    return (
        <form className="authenticationForm" onSubmit={login}>
            <input className="textBox" type="email" name="email" placeholder="Enter Email" required value={data.email} onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })} />
            <input className="textBox" type="password" name="password" placeholder="Enter Password" required value={data.password} onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })} />
            <label><input id="keepLoggedIn" type="checkbox" checked={checked} onChange={() => setChecked(!checked)} /> Keep me logged in</label>
            <button disabled={processing} type="submit" >{processing ? <MdRefresh className="refreshing"/> : ""} Log In</button>
        </form>
    )
}