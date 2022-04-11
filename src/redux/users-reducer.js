import {unfollowAPI, userAPI} from "../api/Api";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_STATE = 'SET_STATE';
const SET_TOTAL_USER_COUNT = 'SET_TOTAL_USER_COUNT';
const SET_MORE_USERS = 'SET_MORE_USERS';
const CHANGE_CURRENT_PAGE = 'CHANGE_CURRENT_PAGE';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';

let initialState = {
    users: [],
    totalUserCount: 0,
    userCount: 5,
    currentPage: 1,
    isFetching: true
}

const usersReducer = (state = initialState, action) => {

    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(user => {
                    if (user.id === action.userID)
                        return {...user, isFollowed: true}
                    return user;
                })
            }
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(user => {
                    if (user.id === action.userID)
                        return {...user, isFollowed: false}
                    return user
                })
            }
        case SET_STATE:
            return {
                ...state,
                users: action.body
                // users: [...state.users, ...action.body]
            }
        case SET_MORE_USERS:
            return {
                ...state,
                users: [...state.users, ...action.body]
            }
        case CHANGE_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.page
            }
        case SET_TOTAL_USER_COUNT:
            // if (action.count > 500) {
            //     return {...state, totalUserCount: action.count / 200}
            // }
            return {
                ...state,
                totalUserCount: action.count
            }
        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.toggle
            }
        default:
            return state;
    }
}

export const follow = (id) => {
    return {
        type: FOLLOW,
        userID: id
    }
}
export const unfollow = (id) => {
    return {
        type: UNFOLLOW,
        userID: id
    }
}
export const setState = (body) => {
    return {
        type: SET_STATE,
        body: body
    }
}
export const setTotalUsersCount = (count) => {
    return {
        type: SET_TOTAL_USER_COUNT,
        count
    }
}
export const setMoreUsers = (body) => {
    return {
        type: SET_MORE_USERS,
        body
    }
}
export const changeCurrentPage = (page) => {
    return {
        type: CHANGE_CURRENT_PAGE,
        page
    }
}
export const toggleIsFetching = (toggle) => {
    return {
        type: TOGGLE_IS_FETCHING,
        toggle
    }
}


export const getUsersThunk = (currentPage, userCount) => {
    return (dispatch) => {
        dispatch(toggleIsFetching(true));
        userAPI.getUsers(currentPage, userCount)
            .then(data => {
                dispatch(toggleIsFetching(false));
                dispatch(setState(data.items));
                dispatch(setTotalUsersCount(data.totalCount));
            });
    }
}

export const unfollowThunk = (userId) => {
    return (dispatch) => {
        userAPI.unfollow(userId)
            .then(data => {
                if (data.resultCode == 0)
                    dispatch(unfollow(userId));
            })
    }
}
export const followThunk = (userId) => {
    return (dispatch) => {
        userAPI.follow(userId)
            .then(data => {
                if (data.resultCode == 0)
                    dispatch(follow(userId));
            })
    }
}

export default usersReducer;