import {loginAPI} from "../api/Api";
import {stopSubmit} from "redux-form";
import {getUserData} from "./auth-reducer";

const INITIALIZED = 'INITIALIZED';

let initialState = {
    initialized: false
}

const appReducer = (state = initialState, action) => {

    switch (action.type) {
        case INITIALIZED:
            return {
                ...state,
                initialized: true
            }
        default:
            return state;
    }
}

export const initialized = () => ({type: INITIALIZED})

export const initialize = () => {
    return (dispatch) => {
        let promiseResult = dispatch(getUserData());

        promiseResult.then(
            dispatch(initialized())
        )
    }
}

export default appReducer;