
import { createContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) =>{  

    const [auth,setAuth] = useState({
        token:null
    })

    useEffect(()=>{

        const token = localStorage.getItem('token');

        if(token){
            setAuth({
                token
            })
        } else {
            setAuth({
                token: null
            })
        }
    },[])


    async function logout() {
        setAuth({
            token: null
        });
        console.log("logout")
        localStorage.removeItem('token');
        
    }

    return (
        <AuthContext.Provider value={{ auth,setAuth,logout}}>
            {children}
        </AuthContext.Provider>

    )

        

}
export default AuthContext;