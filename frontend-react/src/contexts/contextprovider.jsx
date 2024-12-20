import { createContext, useContext, useState } from "react";

const stateContext =  createContext({
    user: null,
    token: null,
    //error: null,
    setUser: () => {},
    setToken: () => {}
    //setError: () => {}
});

export const ContextProvider = ({children}) => {
    const [user, setUser] = useState({});
    const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));

    //const [error, setError] = useState();

    const setToken = (token) => {
        _setToken(token) 
        if(token){
            localStorage.setItem('ACCESS_TOKEN', token);
        }
        else{
            localStorage.removeItem('ACCESS_TOKEN');
        }
    }
    return (
        <stateContext.Provider value={{
            user,
            token,
            //error,
            setUser,
            setToken,
            //setError
        }}>
            {children}
        </stateContext.Provider>
    )
}

export const useStateContext = () => useContext(stateContext);