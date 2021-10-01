import {
    createFetchReducer,
    createImmutableReducer,
    pipeReducers,
} from "../../tools/redux-actions";
import {
    getData,
    addVisibilityCount,
    resetVisibilityCount,
} from "./appActions";

const COUNT = 30;

const [fetchState, fetchReducer] = createFetchReducer({
    result: getData.fetchKey([]),
});

const initialState = {
    visibilityCount: COUNT,
    ...fetchState,
};

export type AppStateType = typeof initialState;

const reducer = createImmutableReducer(initialState)
    .chain(
        addVisibilityCount,
        (state) => (state.visibilityCount += COUNT)
    )
    .chain(
        resetVisibilityCount,
        (state) => (state.visibilityCount = COUNT)
    );


export const appReducer = pipeReducers(reducer, fetchReducer);
