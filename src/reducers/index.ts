import { appReducer } from "./app";
import { AppStateType } from './app/appReducer'
import { settingsReducer } from "./settings";
import { SettingsStateType } from './settings/types'
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
