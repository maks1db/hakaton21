import { appReducer, AppStateType } from "./app";
import { settingsReducer, SettingsStateType } from "./settings";
import { combineReducers } from "redux";

export type State = {
    app: AppStateType;
    settings: SettingsStateType;
};

export const makeRootReducer = () =>
    combineReducers({
        app: appReducer,
        settings: settingsReducer,
    });
