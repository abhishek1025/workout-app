import { createContext, useReducer } from "react";
import { workoutsReducer } from "./workout.reducer";

export const WorkoutsContext = createContext();


export const WorkoutContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(workoutsReducer, {
        workouts: null,
        updateWorkoutID: null
    })

    return (
        <WorkoutsContext.Provider value={{ ...state, dispatch }}>
            {children}
        </WorkoutsContext.Provider>
    )
}

