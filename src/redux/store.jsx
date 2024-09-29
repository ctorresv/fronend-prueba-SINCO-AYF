import { configureStore } from "@reduxjs/toolkit"
import dataReducer from "./slice/dataUpload.js"

const store = configureStore({
    reducer: {
        data: dataReducer
    }
})

export default store