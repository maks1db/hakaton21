import { createAction } from "../../tools/redux-actions";
import { SettingsStateType } from "./types";

export const updateSetting =
    createAction<{ setting: keyof SettingsStateType; data: any }>(
        "UPDATE_SETTING"
    );
