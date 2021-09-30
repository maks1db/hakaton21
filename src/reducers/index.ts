import { appReducer } from "./app";
import { combineReducers } from "redux";

export const makeRootReducer = () =>
    combineReducers({
        app: appReducer
    });
