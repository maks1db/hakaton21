import { createSelector } from "reselect";
import { State } from "../reducers";


const getFields = (state: State) => state.settings.fields;
const getGroups = (state: State) => state.settings.groups;

export const getListFieldsSelector = createSelector(
    [getFields, getGroups],
    (fields, groups) => {
        return fields
            .map((x) => x.field)
            .filter((x) => !groups.some(({ field }) => x === field));
    }
);
