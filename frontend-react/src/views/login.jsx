import {Link} from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import axiosClient from "../axiosClient";
import { useStateContext } from "../contexts/contextprovider";

export default function login(){
    const emailRef = useRef();
    const passwordRef = useRef();
    const [error, setError] = useState(null);

    const {setUser, setToken} = useStateContext();

    
    const Submit = (ev) =>{
        ev.preventDefault();
        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }

            axiosClient.post("login", payload).then(({data})=>{
                setUser(data.user);
                setToken(data.token);
            }).catch((err) =>{
                const response = err.response;
                if(err.response.data.error == "Invalid credentials")
                    alert("Неверные входные данные");
                if(response && response.status === 422){
                    console.log(response.data.errors);
                }
            });

        console.log(error);
    }

    return (
        <div className="login-signup-form animated fadeinDown">
            <div className="form">
                <h1 className="title">Войдите в ваш аккаунт</h1>
                <form onSubmit={Submit}>
                    <input ref={emailRef} type = "email" placeholder="Email"/>
                    <input ref={passwordRef} type = "password" placeholder = "Password"/>
                    <button className="btn btn-block">Войти</button>
                    
                    <p className="message">
                        Не зарегистрированы? <Link to="/register">Создайте аккаунт здесь</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}