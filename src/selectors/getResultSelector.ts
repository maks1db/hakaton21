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
            sort.length === 0 ? [{ field: "name", value: 1 }] : sort;

        const sortConfig = {
            by: sortFields.map(({ field }) => field),
            order: sortFields.map(({ value }) => (value > 0 ? "asc" : "desc")),
        };

        const cash = new Set();
        const pickItemsKeys = rest.fields.map(prop('field'));
        const items = pipe(
            result,
            filter<EmployeeDTO>((item) => {
                const shouldEnable = filters.reduce((acc, { field, value }) => {
                    const fieldValue: string = item[field];

                    return acc
                        ? fieldValue
                              .toLowerCase()
                              .includes((value || "").toLowerCase())
                        : false;
                }, true);
                return shouldEnable;
            }),
            reduce((acc, item) => {
                const listItem = pick(pickItemsKeys, item);
                const cashValue = Object.values(listItem).join();

                if (!cash.has(cashValue)) {
                    // @ts-ignore
                    acc.push(listItem);
                    cash.add(cashValue);
                }

                return acc;
            }, []),
            (list) => sortArray(list, sortConfig) as EmployeeDTO[]
        );

        const omitGroupKeys = rest.groups.map(prop("field"));
        cash.clear()

        const groups = pipe(
            items,
            reduce((acc, item) => {
                const group = pick(omitGroupKeys, item);
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
