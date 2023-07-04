import { ACTION_TYPES } from "../context/Workout/workout.reducer";
import { useAuthContext } from "./useAuthContext";
import { useWorkoutsContext } from "./useWorkoutsContext";


export const useLogout = () => {

    const { dispatch } = useAuthContext();
    const { dispatch: workoutsDispatch } = useWorkoutsContext();

    const logout = () => {
        //remove user from storage
        localStorage.removeItem("user")

        //dispatch logout action
        dispatch({ type: "LOGOUT" })
        workoutsDispatch({ type: ACTION_TYPES.SET_WORKOUTS, payload: null })
    }

    return { logout }

}