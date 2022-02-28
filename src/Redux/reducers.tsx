import { ADD_ITEM, DELETE_ITEM, UPDATE_ITEM } from "./actions/actionTypes";

const initialState = {
    users: [
        {
            id: 0,
            name: "",
            age: "",
            gender: ""
        }
    ]
}

const reducers = (state = initialState, action: any) => {
    switch (action.type) {
        case ADD_ITEM:
            return {
                ...state,
                users: [...state.users, action.payload]
            }
    
        case DELETE_ITEM:
            const filteredUsers = state.users.filter(user => user.id !== action.payload)            
            return {
                ...state,
                users: filteredUsers
            }

        case UPDATE_ITEM:
            console.log(action.payload);
            const updatedUser = state.users.map(user => user.id === action.payload.id ? action.payload : user);
            return {
                ...state,
                users: updatedUser
            }

        default:
            return state;
    }
}

export default reducers;