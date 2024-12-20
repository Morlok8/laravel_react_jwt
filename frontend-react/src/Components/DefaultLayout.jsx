import axios from "axios";
import { useEffect } from "react";
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axiosClient from "../axiosClient";
import { useStateContext } from "../contexts/contextprovider.jsx";

export default function DefaultLayout(){
    //const localUser = JSON.parse(localStorage.getItem("user"));
    const {user, token, setUser, setToken} = useStateContext();
    if(!token){
        return <Navigate to='/login'/>
    }
    //console.log(user);
    const onLogout =  (ev) =>{
        ev.preventDefault();
        axiosClient.post('/logout')
        .then(({}) => {
           setUser(null)
           setToken(null)
        })
    }
    
    useEffect(() => {
        axiosClient.get('/user')
          .then(({data}) => {
             setUser(data.user)
          })
      }, [])

    return (
        <div id = "defaultLayout">
            <div className="content">
                <header>
                    <div>
                        Страница
                    </div>
                    <div>
                        {user.name}
                        <a href="#" onClick={onLogout} className="btn-logout">Выйти</a>
                    </div>
                </header>
                <main>
                    <div>Поздравляем, вы вошли в аккаунт!</div>
                    <Outlet />
                </main>
            </div>
            
           
        </div>
    )
}