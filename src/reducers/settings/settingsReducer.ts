import { createImmutableReducer } from "../../tools/redux-actions";
import { SettingsStateType } from "./types";
import {
    addField,
    addFilter,
    addGroup,
    addSort,
    removeField,
} from "./settingsActions";
import { FieldType } from "../../types";

const initialState: SettingsStateType = {
    fields: [{ field: "name" }],
    filters: [{ field: "name", value: "" }],
    groups: [],
    sort: [],
};

export const settingsReducer = createImmutableReducer(initialState)
    .chain(addField, (state, { payload }) => state.fields.push(payload))
    .chain(addFilter, (state, { payload }) => state.filters.push(payload))
    .chain(addGroup, (state, { payload }) => state.groups.push(payload))
    .chain(addSort, (state, { payload }) => state.sort.push(payload))
    .chain(removeField, (state, { payload: { field, type } }) => {
        const index = (state[type] as FieldType[]).findIndex(
            (x) => x.field === field
        );
        state[type].splice(index, 1);
    });
