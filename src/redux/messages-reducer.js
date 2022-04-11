const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT';
const ADD_MESSAGE = 'ADD-MESSAGE';

let initialState = {
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
}

const messagesReducer = (state = initialState, action) => {

    function _addMessage() {
        return {
            ...state,
            dialog: [...state.dialog, {'id': state.dialog.length + 1, 'message': action.newMessage}]
        }
    }

    switch (action.type) {
        case ADD_MESSAGE:
            return _addMessage();
        default:
            return state;
    }

}

export let addMessageActionCreator = (newMessage) => ({type: ADD_MESSAGE, newMessage})

export const addMessage = (newMessage) => {
    return (dispatch) => {
        dispatch(addMessageActionCreator(newMessage));
    }
}

export default messagesReducer;