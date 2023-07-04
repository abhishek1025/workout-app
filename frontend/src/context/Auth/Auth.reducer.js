
export const ACTION_TYPES = {
    LOGIN: "LOGIN",
    LOGOUT: "LOGOUT"
}
export const authReducer = (state, action) => {
    switch (action.type) {

        case ACTION_TYPES.LOGIN:
            return { user: action.payload }

        case ACTION_TYPES.LOGOUT:
            return { user: null }

        default:
            return state
    }
}