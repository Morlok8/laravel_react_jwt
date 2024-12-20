import { useRef } from "react";
import {Link} from "react-router-dom";
import axiosClient from "../axiosClient";
import { useStateContext } from "../contexts/contextprovider";

export default function login(){
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    const {setUser, setToken} = useStateContext();

    const Submit = (ev) =>{
        ev.preventDefault();
        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }

        axiosClient.post("register", payload).then(({data})=>{
            setUser(data.user);
            setToken(data.token);
        }).catch((err) =>{
            console.log(err);
            //const response = err.response;
            
            const response = JSON.parse(err.response.data);

            if(typeof response.email !== 'undefined'){
                if(response.email == "The email has already been taken.")
                    alert("На этой почте уже создан аккаунт");
            }
            if(typeof response.name !== 'undefined'){
                if(response.email == "The name field is required.")
                    alert("Необходимо ввести имя");
            }
            console.log(response.email);
        });
    }

    return (
        <div className="login-signup-form animated fadeinDown">
            <div className="form">
                <h1 className="title">Регистрация</h1>
                <form onSubmit={Submit}>
                    <input ref={nameRef} type = "name" placeholder="Имя"/>
                    <input ref={emailRef} type = "email" placeholder="Email"/>
                    <div className="tooltip">
                        <input ref={passwordRef} type = "password" placeholder = "Пароль" pattern='^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]{6,16}$'
                required/>
                        <span className="tooltiptext">Пароль должен содержать буквы в разных регистрах и цифры</span>
                    </div>
                    <button className="btn btn-block">Зарегистрироваться</button>
                    <p className="message">
                        Зарегестрированы? <Link to="/login">Войдите в ваш аккаунт</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}