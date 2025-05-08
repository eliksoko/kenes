import { createContext, useContext, useState, type PropsWithChildren } from "react";
import type { User, Values } from "./data";
import api from "./api";

interface ContextProps
{
    user?: User | null
    signIn: (values:Values) => Promise<string|false>
    signUp: (values:Values) => Promise<string|false>
    signOut: () => Promise<string|false>
}

const StateContext = createContext<ContextProps>({
    signIn: async():Promise<string|false> => false,
    signUp: async():Promise<string|false> => false,
    signOut: async():Promise<string|false> => false
})

export const useAuth = () => useContext<ContextProps>(StateContext)

export const AuthProvider = ({ children }: PropsWithChildren) =>
{
    const [user, setUser] = useState<User>()

    const signIn = async(values:Values):Promise<string|false> =>
    {
        const {data} = await api.post('/signin', values)
        if(data?.error) return data.error
        if(data?.user) setUser(data.user)
        return false
    }
    const signUp = async(values:Values):Promise<string|false> =>
    {
        const {data} = await api.post('/signup', values)
        if(data?.error) return data.error
        return false
    }
    const signOut = async():Promise<string|false> =>
    {
        const {data} = await api.post('/signout')
        if(data?.error) return data.error
        setUser(undefined)
        return false
    }
    
    return (
        <StateContext.Provider value={{
            user,
            signIn,
            signUp,
            signOut
        }}>
            {children}
        </StateContext.Provider>
    );
}
