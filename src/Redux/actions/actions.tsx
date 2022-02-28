import { ADD_ITEM, DELETE_ITEM, UPDATE_ITEM } from "./actionTypes";
export const addItem = (data: any) => {
    return {
        type: ADD_ITEM,
        payload: data
    }
}

export const deleteItem = (data: any) => {
    return {
        type: DELETE_ITEM,
        payload: data
    }
}

export const updateItem = (data: any) => {
    return {
        type: UPDATE_ITEM,
        payload: data
    }
}