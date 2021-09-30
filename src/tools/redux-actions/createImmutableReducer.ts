import produce from 'immer';

interface Handlers<S> {
    [ACTION_TYPE: string]: <P extends any>(state: S, payload: P) => void;
}

interface ChainReducer<S> {
    (state: S, action: any): S;
    chain<A extends (...arg: any) => any>(
        action: A,
        func: (state: S, acionResult: ReturnType<A>) => any,
    ): ChainReducer<S>;
}

export function createImmutableReducer<S>(
    initialState: S,
    handlers?: Handlers<S>,
): ChainReducer<S>;
export function createImmutableReducer(initialState: any, handlers?: any) {
    const reducerHandlers = handlers || {};

    function reducer(state = initialState, action: any) {
        if (Object.keys(reducerHandlers).find(x => x === action.type)) {
            return produce(state, (draftState: object) => {
                reducerHandlers[action.type](draftState, action);
            });
        }
        return state;
    }

    reducer.chain = (action: any, func: any) => {
        reducerHandlers[action.toString()] = func;
        return reducer;
    };

    return reducer;
}
