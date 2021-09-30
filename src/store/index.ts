import { configureStore } from "./configureStore";
import { makeRootReducer } from "../reducers";
import { rootSaga } from "../sagas";

export const createStore = () => {
    const store = configureStore({
        rootReducer: makeRootReducer(),
        rootSaga,
    });

    return store;
};
