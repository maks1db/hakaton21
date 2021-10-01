import { appReducer } from "./app";
import { settingsReducer } from "./settings";
import { combineReducers } from "redux";

export const makeRootReducer = () =>
    combineReducers({
        // @ts-ignore
        app: appReducer,
        settings: settingsReducer,
    });
