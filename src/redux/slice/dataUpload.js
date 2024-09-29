import { createSlice } from "@reduxjs/toolkit";

const dataSlice = createSlice({
    name: 'data',
    initialState: {
        isNewVehicleSuccess: false
    },
    reducers: {
        setNewVehicleSuccess(state, action) {
            state.isNewVehicleSuccess = action.payload
        }
    }
})

export const {setNewVehicleSuccess} = dataSlice.actions

export default dataSlice.reducer