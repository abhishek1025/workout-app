import { createContext, useEffect, useReducer } from 'react'
import { ACTION_TYPES, authReducer } from './Auth.reducer';

export const AuthContext = createContext();


export const AuthContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(authReducer, {
        user: null
    })

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))
        if (user) {
            dispatch({ type: ACTION_TYPES.LOGIN, payload: user })
        }
    }, [])

    console.log("AuthContext state: ", state)

    return <AuthContext.Provider value={{ ...state, dispatch }}>{children}</AuthContext.Provider>
}