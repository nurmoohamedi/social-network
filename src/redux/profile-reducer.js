import {userAPI} from "../api/Api";
import {stopSubmit} from "redux-form";

const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";
const DELETE_POST = 'DELETE-POST';
const LIKE = 'LIKE';
const SET_PROFILE = 'SET_PROFILE';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const UPDATE_NEW_STATUS_TEXT = 'UPDATE_NEW_STATUS_TEXT';
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS';
const SET_PROFILE_STATUS = 'SET_PROFILE_STATUS';

let initialState = {
    posts: [
        {"id": 1, "message": "Wassup world!", "likesCount": 5},
        {"id": 2, "message": "I'm Onizuka!", "likesCount": 14},
        {"id": 3, "message": "React JS is awesome!", "likesCount": 21}
    ],
    profile: null,
    toggleIsFetching: false,
    profileStatus: ''
}

const profileReducer = (state = initialState, action) => {

    function _addPost(postText) {
        let id = state.posts.length + 1;
        return {
            ...state,
            posts: [...state.posts, {"id": id, "message":postText, 'likesCount': 0}]
        };
    }

    function _deletePost(id) {
        let stateCopy = {
            ...state,
            posts: [...state.posts]
        }
        for (let i = 0; i < stateCopy.posts.length; i++) {
            if (stateCopy.posts[i].id === id) {
                stateCopy.posts.splice(i, 1);
            }
        }
        return stateCopy;
    }

    function _updateLikeCount(id, count) {
        let stateCopy = {
            ...state,
            posts: [...state.posts]
        }
        // ERROR --- THIS IS NOT RIGHT
        // Need to update THIS LOGIC
        for (let i = 0; i < stateCopy.posts.length; i++) {
            if (stateCopy.posts[i].id === id) {
                stateCopy.posts[i].likesCount = count;
            }
        }

        return stateCopy;
    }

    switch (action.type) {
        case ADD_POST:
            return _addPost(action.postText);
        case DELETE_POST:
            return _deletePost(action.id);
        case LIKE:
            return _updateLikeCount(action.id, action.count);
        case SET_PROFILE:
            return {
                ...state, profile: action.profile
            }
        case SET_PROFILE_STATUS:
            return {
                ...state, profileStatus: action.status
            }
        case SAVE_PHOTO_SUCCESS:
            debugger
            return {
                ...state, profile: {...state.profile, photos: action.photos}
            }
        default:
            return state;
    }
}

export let addPost = (postText) => ({type: ADD_POST, postText})
export let deletePostAction = (id) => ({
    type: DELETE_POST,
    id: id
})
export let likeAction = (count) => ({
    type: LIKE,
    count: count
})
export let setProfile = (profile) => ({type: SET_PROFILE, profile})
export const toggleIsFetching = (toggle) => {
    return {
        type: TOGGLE_IS_FETCHING,
        toggle
    }
}
let onChangeStatusAC = (status) => ({
    type: SET_PROFILE_STATUS, status
})
export const savePhotoSuccess = (photos) => ({
    type: SAVE_PHOTO_SUCCESS, photos
})
export const setProfileStatus = (status) => ({
    type: SET_PROFILE_STATUS, status
})

export const onChangeStatus = (status) => {
    return (dispatch) => {
        dispatch(onChangeStatusAC(status));
        console.log("Status changed!")
    }
}

export const getProfileUser = (userId) => {
    return (dispatch) => {
        dispatch(toggleIsFetching(true));
        userAPI.getProfileUser(userId)
            .then(data => {
                    dispatch(toggleIsFetching(false))
                    dispatch(setProfile(data))
                }
            )
    }
}
export const savePhoto = (photos) => {
    return (dispatch) => {
        userAPI.savePhoto(photos)
            .then(data => {
                if (data.resultCode == 0)
                    dispatch(savePhotoSuccess(data.data.photos));
            })
    }
}
export const saveProfileData = (formData) => (dispatch, getState) => {
        debugger
        const userId = getState().auth.id;
        userAPI.saveProfileData(formData)
            .then(response => {
                if (response.data.resultCode == 0){
                    debugger
                    dispatch(getProfileUser(userId));
                }
                else
                {
                    dispatch(stopSubmit("ProfileDataForm",{_error:response.data.messages[0]}))
                    return Promise.reject(response.data.messages[0])
                }
            })
    }

export const getProfileStatus = (userId) =>   (dispatch) => {
        // debugger
        try {
            // let response = await userAPI.getProfileStatus(userId);
            userAPI.getProfileStatus(userId).then(response => {
                dispatch(setProfileStatus(response.data));
            })

        }catch (error)
        {
            console.log(error)
            debugger
        }
}
export const saveProfileStatus = (status) => async (dispatch) => {
    debugger
    try {
        let response = await userAPI.setProfileStatus(status);
        if ( response.data.resultCode === 0){
            dispatch(setProfileStatus(status));
            alert(status + " - status updated succsess!")
        }
    }catch (error){
        console.log(error)
        debugger
    }
}

export default profileReducer;