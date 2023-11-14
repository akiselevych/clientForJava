//libs
import {combineReducers} from "redux";
import {configureStore} from "@reduxjs/toolkit";
//redux
import Customers from './slices/Customers.slice'


const rootReducer = combineReducers({
    Customers,
});

export const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production'
})
