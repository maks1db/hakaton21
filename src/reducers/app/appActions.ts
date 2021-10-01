import {
    createAction,
    makeAsyncActionCreator,
} from "../../tools/redux-actions";
import { EmployeeDTO } from "../../types";

export const initApp = createAction("INIT_APP");
export const getEmployees =
    makeAsyncActionCreator<EmployeeDTO[]>("GET_EMPLOYEES");

export const addVisibilityCount = createAction<number>("ADD_VISIBILITY_COUNT");
export const resetVisibilityCount = createAction('RESET_VISIBILITY_COUNT');
