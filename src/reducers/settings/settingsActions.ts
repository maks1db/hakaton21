import { createAction } from "../../tools/redux-actions";
import { FieldType, FilterType, GroupType, SortType } from "../../types";
import { SettingsStateType } from "./types";

export const addField = createAction<FieldType>("ADD_FIELD");
export const addFilter = createAction<FilterType>("ADD_FILTER");
export const addGroup = createAction<GroupType>("ADD_GROUP");
export const addSort = createAction<SortType>("ADD_SORT");

export const removeField =
    createAction<{ type: keyof SettingsStateType; field: string }>(
        "REMOVE_FIELD"
    );
