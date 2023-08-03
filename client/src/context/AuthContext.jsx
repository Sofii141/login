//datos de autenticacion del usuario 
//--------------------------------------------------------------------
import { createContext, useState, useContext, useEffect } from 'react'
import { registerRequest, loginRequest, verityTokenRequest } from '../api/auth.js'
import Cookies from 'js-cookie'
//---------------------------------------------------------------------
//usuario leido desde toda la aplicacion 
export const AuthContext = createContext();

//para solo tener que exportar esta funcion en los otros componentes
export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}


//provider = elemento que engloba a otros
export const AuthProvider = ({ children }) => {

    //usuario leido en toda la aplicacion
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true);

    //hace la peticion / resivir datos del usuario registrado
    const signup = async (user) => {
        try {
            const res = await registerRequest(user);
            console.log(res.data);
            setUser(res.data);
            setIsAuthenticated(true);
        } catch (error) {
            setErrors(error.response.data);
        }
    }

    const signin = async (user) => {
        try {
            const res = await loginRequest(user);
            console.log(res);
            setIsAuthenticated(true);
            setUser(res.data);
        } catch (error) {
            if (Array.isArray(error.response.data)) {
                return setErrors(error.response.data);
            }
            setErrors([error.response.data])
        }
    }

    const logout = () => {
        Cookies.remove('token');
        setIsAuthenticated(false);
        setUser(null);
    }
    // depende de donde cambie errors
    //despues de 5 segundos se vacian los errores 
    useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([]);
            }, 5000)
            //no consumir tantos recursos, limpia el timer
            return () => clearTimeout(timer);
        }
    }, [errors])

    //token 
    useEffect(() => {

        async function checkLogin() {

            const cookies = Cookies.get();

            if (!cookies.token) {
                setIsAuthenticated(false);
                setLoading(false);
                return setUser(null);
            }

            try {
                //si hay un token hay que enviarlo al backend para verificarlo
                const res = await verityTokenRequest(cookies.token);

                if (!res.data) {
                    setIsAuthenticated(false);
                    setLoading(false);
                    return; 
                }

                setIsAuthenticated(true);
                setUser(res.data);
                setLoading(false);

            } catch (error) {
                setIsAuthenticated(false);
                setUser(null);
                setLoading(false);
            }
        }

        checkLogin();

    }, [])

    return (
        <AuthContext.Provider value={{
            signup,
            user,
            isAuthenticated,
            errors,
            signin,
            loading,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
}