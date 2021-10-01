import { createImmutableReducer } from "../../tools/redux-actions";
import { SettingsStateType } from "./types";
import { updateSetting } from "./settingsActions";

const initialState: SettingsStateType = {
    fields: [{ field: "name" }],
    filters: [],
    groups: [],
    sort: [],
};

export const settingsReducer = createImmutableReducer(initialState).chain(
    updateSetting,
    (state, { payload: { data, setting } }) => (state[setting] = data)
);
