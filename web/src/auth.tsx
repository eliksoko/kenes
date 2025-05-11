import { createContext, useContext, useEffect, useState, type PropsWithChildren } from "react";
import api from "./api";

interface ContextProps
{
    token?:string
    signIn: (username:string, password:string) => Promise<string|false>
    signOut: () => Promise<void>
}

const StateContext = createContext<ContextProps>({
    signIn: async():Promise<string|false> => false,
    signOut: async():Promise<void> => {}
})

export const useAuth = () => useContext<ContextProps>(StateContext)

export const AuthProvider = ({ children }: PropsWithChildren) =>
{
    const [token, setToken] = useState()

    async function signIn(username:string, password:string)
    {
        try
        {
            const {data:{token}} = await api.post('/token', {username, password})
            if(token) setToken(token)
        }
        catch(e)
        {
            console.error(e)
            return 'Server error. try again'
        }
        return false
    }
    async function signOut()
    {
        setToken(undefined)
    }
    
    useEffect(() => {
        const id = api.interceptors.request.use(config => {
            const method = (config.method || '').toLowerCase();
            if (method === 'get') {
                config.params = {
                    ...(config.params || {}),
                    token,
                };
            }
            return config;
        }, error => Promise.reject(error))
        return function(){
          api.interceptors.request.eject(id)
        }
    }, [token])

    // async function signUp(username:string, password:string)
    // {
    //     try
    //     {
    //         const {data:{error}} = await api.post('/signup', {username, password})
    //         if(error) return error
    //     }
    //     catch(e)
    //     {
    //         console.error(e)
    //         return 'Server error. try again'
    //     }
    //     return false
    // }
    // async function signOut()
    // {
    //     try
    //     {
    //         const {data:{error}} = await api.post('/signout')
    //         if(error) return error
    //         setUser(undefined)
    //         localStorage.removeItem('user')
    //     }
    //     catch(e)
    //     {
    //         console.error(e)
    //         return 'Server error. try again'
    //     }
    //     return false
    // }
    // async function refresh()
    // {
    //     try
    //     {
    //         const {data:{error,user}} = await api.post('/refresh')
    //         if(!error) setUser(user)
    //     }
    //     catch{}
    // }
    // useEffect(() => {
    //     refresh()
    // }, []);

    return (
        <StateContext.Provider value={{
            token,
            signIn,
            signOut
            // signUp,
        }}>
            {children}
        </StateContext.Provider>
    );
}
