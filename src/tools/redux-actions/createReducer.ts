interface Handlers<S> {
    [ACTION_TYPE: string]: <P extends Record<string, any>>(
        state: S,
        payload: P
    ) => S;
}

export function createReducer<S>(
    initialState: S,
    handlers: Handlers<S>
): (state: S, action: Record<string, any>) => S;
export function createReducer(initialState: any, handlers: any) {
    return function reducer(state = initialState, action: any) {
        if (Object.keys(handlers).find((x) => x === action.type)) {
            return handlers[action.type](state, action);
        }
        return state;
    };
}
