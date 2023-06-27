
export const ACTION_TYPES = {
    SET_WORKOUTS: "SET_WORKOUTS",
    CREATE_WORKOUT: "CREATE_WORKOUT",
    DELETE_WORKOUT: "DELETE_WORKOUT",
    UPDATE_WORKOUT: "UPDATE_WORKOUT"
}

export const workoutsReducer = (state, action) => {
    switch (action.type) {
        case ACTION_TYPES.SET_WORKOUTS:
            return {
                workouts: action.payload
            }

        case ACTION_TYPES.CREATE_WORKOUT:
            return {
                workouts: [action.payload, ...state.workouts]
            }

        case ACTION_TYPES.DELETE_WORKOUT:

            return {
                workouts: state.workouts.filter(({ _id }) => action.payload !== _id)
            }

        case ACTION_TYPES.UPDATE_WORKOUT:
            return {
                updateWorkoutDetails: state.workouts.filter(({ _id }) => action.payload === _id),
                workouts: state.workouts.filter(({ _id }) => action.payload !== _id)
            }

        default:
            return state;
    }
}