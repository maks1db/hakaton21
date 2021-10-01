import { FieldType, FilterType, GroupType, SortType } from "../../types";

export type SettingsStateType = {
    fields: FieldType[];
    filters: FilterType[];
    groups: GroupType[];
    sort: SortType[];
};
