import { createSelector } from "reselect";
import { State } from "../reducers";

import sortArray from "sort-array";
import { pick, prop, filter, reduce } from "ramda";
import { pipe } from "fp-ts/lib/function";
import { EmployeeDTO } from "../types";

const getResult = (state: State) => state.app.result.data;
const getSettings = (state: State) => state.settings;

export const getResultSelector = createSelector(
    [getResult, getSettings],
    (result, settings) => {
        const { filters, sort, ...rest } = settings;
        const sortFields =
            sort.length === 0 ? [{ field: "name", direction: 1 }] : sort;
        const sortConfig = {
            by: sortFields.map(({ field }) => field),
            order: sortFields.map(({ direction }) =>
                direction > 0 ? "asc" : "desc"
            ),
        };

        const items = pipe(
            result,
            filter<EmployeeDTO>((item) => {
                const shouldEnable = filters.reduce((acc, { field, value }) => {
                    const fieldValue: string = item[field];

                    return acc
                        ? fieldValue.toLowerCase().includes(value.toLowerCase())
                        : false;
                }, true);
                return shouldEnable;
            }),
            (list) => sortArray(list, sortConfig) as EmployeeDTO[]
        );

        const omitKeys = rest.groups.map(prop("field"));
        const cash = new Set();

        const groups = pipe(
            items,
            reduce((acc, item) => {
                const group = pick(omitKeys, item);
                const cashValue = Object.values(group).join();

                if (!cash.has(cashValue)) {
                    // @ts-ignore
                    acc.push(group);
                    cash.add(cashValue);
                }

                return acc;
            }, []),
            (list) => sortArray(list, sortConfig) as Partial<EmployeeDTO>[]
        );

        return { items, groups };
    }
);
