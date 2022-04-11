import {loginAPI} from "../api/Api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'SET_USER_DATA-POST';
const SET_CAPTCHA_URL = 'GET_CAPTCHA_URL';

let initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null
}

const authReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.data
            }
        case SET_CAPTCHA_URL:
            return {
                ...state,
                captchaUrl: action.captchaUrl
            }
        default:
            return state;
    }
}

export const setUserData = (id, email, login, isAuth) => ({type: SET_USER_DATA, data: {id, email, login, isAuth}})
export const setCaptcha = (captchaUrl) => ({type: SET_CAPTCHA_URL, captchaUrl})

export const getUserData = () => {
    return (dispatch) => {
        return loginAPI.authMe().then(response => {
            let {id, email, login} = response.data.data;
            if (response.data.resultCode === 0)
                dispatch(setUserData(id, email, login, true));
        });
    }
}

export const login = (formData) => {
    return (dispatch) => {
        loginAPI.login(formData)
            .then(data => {
                console.log(data)
                if (data.resultCode === 0) {
                    alert('You logged successfully - ID - ' + data.data.userId);
                    dispatch(getUserData());
                } else {
                    if (data.resultCode === 10){
                        debugger
                        dispatch(getCaptchaUrl());
                    }
                    let message = data.messages.length > 0 ? data.messages[0] : 'Some error';
                    dispatch(stopSubmit('login', {_error: message}))
                }
            })
    }
}

export const logout = () => {
    return (dispatch) => {
        loginAPI.logout().then(responce => {
            if (responce.data.resultCode === 0)
                dispatch(setUserData(null, null, null, false));
        })
    }
  
}
export const getCaptchaUrl = () => {
    return (dispatch) => {
        loginAPI.getCaptchaUrl()
            .then(response => {
                debugger
            dispatch(setCaptcha(response.data.url));
        })
    }

}

export default authReducer;