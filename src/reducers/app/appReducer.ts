import {
    createFetchReducer,
    createImmutableReducer,
    pipeReducers,
} from "../../tools/redux-actions";
import {
    getEmployees,
    addVisibilityCount,
    resetVisibilityCount,
} from "./appActions";

const EMPLOYEE_COUNT_PER_STEP = 30;

const [fetchState, fetchReducer] = createFetchReducer({
    employees: getEmployees.fetchKey([]),
});

const initialState = {
    visibilityCount: EMPLOYEE_COUNT_PER_STEP,
    ...fetchState,
};

export type AppStateType = typeof initialState;

const reducer = createImmutableReducer(initialState)
    .chain(
        addVisibilityCount,
        (state) => (state.visibilityCount += EMPLOYEE_COUNT_PER_STEP)
    )
    .chain(
        resetVisibilityCount,
        (state) => (state.visibilityCount = EMPLOYEE_COUNT_PER_STEP)
    );


export const appReducer = pipeReducers(reducer, fetchReducer);
