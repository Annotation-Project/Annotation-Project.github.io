import React from "react"
import {useNavigate} from 'react-router-dom';
import Apis from "../constants/Apis";

export const Signup = () => {
    const navigate = useNavigate();
    const initState = {
        name:"",
		email:"",
		password:""
	};
	const [data, setData] = React.useState(initState);
	const [checked, setChecked] = React.useState(true);
	const [pass2, setPass2] = React.useState("");
    const signup = (e) => {
		e.preventDefault();
        if (data.password === pass2) {
            fetch(Apis.signup, {
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
                navigate('/', { replace: true });
            }).catch((e) => alert(e.message));
        } else {
            alert("Passwords mismatch!");
        }
	}
    return (
        <form className="authenticationForm" onSubmit={signup}>
            <input className="textBox" type="text" name="name" placeholder="Enter Name" required value={data.name} onChange={(e)=> setData({...data, [e.target.name]: e.target.value})} />
            <input className="textBox" type="email" name="email" placeholder="Enter Email" required value={data.email} onChange={(e)=> setData({...data, [e.target.name]: e.target.value})} />
            <input className="textBox" type="password" name="password" placeholder="Enter Password" required value={data.password} onChange={(e)=> setData({...data, [e.target.name]: e.target.value})} />
            <input className="textBox" type="password" placeholder="Confirm Password" required value={pass2} onChange={(e)=> setPass2(e.target.value)}/>
            <label><input id="keepLoggedIn" type="checkbox" checked={checked} onChange={(e)=> setChecked(!checked)} /> Keep me logged in</label>
            <button type="submit" className="authenticateBtn positiveBtn">Sign Up</button>
        </form>
    )
}