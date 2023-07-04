import { useState } from "react"
import { useAuthContext } from "./useAuthContext";
import { ACTION_TYPES } from "../context/Auth/Auth.reducer";

export const useSignup = () => {

    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState();

    const { dispatch } = useAuthContext()

    const signUp = async (email, password) => {

        setIsLoading(true)
        setError(null)

        const res = await fetch('/api/user/signup', {
            method: 'POST',
            headers: { 'Content-Type': "application/json" },
            body: JSON.stringify({ email, password })
        })

        const json = await res.json();

        if (!res.ok) {
            setIsLoading(false)
            setError(json.error)
        }

        if (res.ok) {
            //saving user to localstorage
            localStorage.setItem('user', JSON.stringify(json))

            //
            dispatch({ type: ACTION_TYPES.LOGIN, payload: json })

            setIsLoading(false)

        }
    }

    return { signUp, isLoading, error }
}