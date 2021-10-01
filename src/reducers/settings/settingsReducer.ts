import { createImmutableReducer } from "../../tools/redux-actions";
import { SettingsStateType } from "./types";
import { updateSetting } from "./settingsActions";
import { FieldType } from "../../types";

const initialState: SettingsStateType = {
    fields: [{ field: "name" }],
    filters: [{ field: "name", value: "" }],
    groups: [],
    sort: [],
};

export const settingsReducer = createImmutableReducer(initialState).chain(
    updateSetting,
    (state, { payload: { data, setting } }) => (state[setting] = data)
);
