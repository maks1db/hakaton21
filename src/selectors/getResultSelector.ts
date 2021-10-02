import { createSelector } from "reselect";
import { State } from "../reducers";

import sortArray from "sort-array";
import { pick, prop, filter, reduce } from "ramda";
import { pipe } from "fp-ts/lib/function";
import { EmployeeDTO } from "../types";

const getResult = (state: State) => state.app.result.data;
const getSettings = (state: State) => state.settings;


const { sort: defaultSort = [] } = window.__ABB
export const getResultSelector = createSelector(
    [getResult, getSettings],
    (result, settings) => {
        const { filters, sort, ...rest } = settings;
        const sortFields =
            sort.length === 0 ? defaultSort.map(x => ({ field: x, value: 1 })) : sort;

        const sortConfig = {
            by: sortFields.map(({ field }) => field),
            order: sortFields.map(({ value }) => (value > 0 ? "asc" : "desc")),
        };

        const cash = new Set();

        const pickItemsKeys = rest.fields.map(prop("field"));
        const pickGroupKeys = rest.groups.map(prop("field"));

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
                const group = pick(pickGroupKeys, item);

                if (!cash.has(cashValue)) {
                    // @ts-ignore
                    acc.push({
                        ...listItem,
                        // @ts-ignore
                        group: Object.values(group).join(),
                    });
                    cash.add(cashValue);
                }

                return acc;
            }, []),
            (list) => sortArray(list, sortConfig) as EmployeeDTO[]
        );

        cash.clear();

        const groups = pipe(
            items,
            reduce((acc, item) => {
                const group = pick(pickGroupKeys, item);
                const cashValue = Object.values(group).join();

                if (!cash.has(cashValue)) {
                    // @ts-ignore
                    acc.push({
                        ...group,
                        // @ts-ignore
                        items: items.filter((x) => x.group === cashValue),
                    });
                    cash.add(cashValue);
                }

                return acc;
            }, []),
            (list) => sortArray(list, sortConfig) as (Partial<EmployeeDTO> & { items: EmployeeDTO[] })[]
        );

        return { items, groups };
    }
);
