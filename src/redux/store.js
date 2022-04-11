import profileReducer from "./profile-reducer";
import messagesReducer from "./messages-reducer";

let store = {

    _state: {
        profilePage: {
            posts: [
                {"id": 1, "message": "Wassup world!", "likesCount": 5},
                {"id": 2, "message": "Damn maaan!", "likesCount": 14},
                {"id": 3, "message": "That's the shit!", "likesCount": 21}
            ],
            newPostText: ''
        },
        messagesPage: {
            message: [
                {"id": 1, "name": "Nurym"},
                {"id": 2, "name": "Merei"},
                {"id": 3, "name": "Ernar"},
                {"id": 4, "name": "Arai"}
            ],
            dialog: [
                {"id": 1, "message": "Che tam"},
                {"id": 2, "message": "How it's going?"},
                {"id": 3, "message": "Chop-chop!"}
            ],
            newMessageText: ''
        }
    },

    getState() {
        return this._state;
    },

    _reRenderEntireTree() {
        console.log("State is changed");
    },
    subscribe(observer) {
        this._reRenderEntireTree = observer;
    },

    dispatch(action) {

        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.messagesPage = messagesReducer(this._state.messagesPage, action);

        this._reRenderEntireTree(this);
    }
}

window.store = store;

export default store;
