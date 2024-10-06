import { createSlice } from "@reduxjs/toolkit";

export const network = createSlice({
    name:'network',
    initialState:{
        isAvailable:true,
    },
    reducers:{
        updateNetwork:(state,action)=>{
            state.isAvailable = action.payload;
        },
    },
});

export const {updateNetwork} = network.actions;
