import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type messageObject = {
    message: string,
    error?: ""
    ['data-provider']?: any
}
export type initialStateType = {
    messageObject?: messageObject
}
const initialState: initialStateType = {}

export const UI_UX = createSlice({
    name: "UI_UX",
    initialState,
    reducers: {
        setMessage(state, action: PayloadAction<messageObject>){
            state.messageObject = action.payload
        },
        clearMessage(state){
            state.messageObject = undefined
        }
    },
});

export const { setMessage, clearMessage } = UI_UX.actions;
export default UI_UX.reducer;
