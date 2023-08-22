import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const dataCenter = createSlice({
    name: "dataCenter",
    initialState: {} as { [index: string]: any },
    reducers: {
        setValue: (
            state,
            action: PayloadAction<{ key: string; value: any }>
        ) => {
            state[action.payload.key] = action.payload.value;
        },
    },
});

export const { setValue } = dataCenter.actions;
export default dataCenter.reducer;
