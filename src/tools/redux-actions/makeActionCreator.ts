export function makeActionCreator<BT extends string>(
    type: BT,
): () => Record<'type', BT>;
export function makeActionCreator<T>(
    type: string,
    arg: string,
): (arg: T) => object & Record<'type', string>;
export function makeActionCreator<T1, T2>(
    type: string,
    arg1: string,
    arg2: string,
): (arg1: T1, arg2: T2) => object & Record<'type', string>;
export function makeActionCreator<BT extends string, K extends string>(
    type: BT,
    arg: K,
): <T>(arg: T) => Record<K, T> & Record<'type', BT>;
export function makeActionCreator<BT extends string, K extends string, T>(
    type: BT,
    arg: K,
): (arg: T) => Record<K, T> & Record<'type', BT>;
export function makeActionCreator<
    BT extends string,
    K1 extends string,
    K2 extends string
>(
    type: BT,
    arg1: K1,
    arg2: K2,
): <T1, T2>(
    arg1: T1,
    arg2: T2,
) => Record<K1, T1> & Record<K2, T2> & Record<'type', BT>;
export function makeActionCreator<A extends [any, any]>(
    type: string,
    arg: string,
): (arg: A[1]) => Record<A[0], A[1]> & Record<'type', string>;
export function makeActionCreator<A extends [any, any, any, any]>(
    type: string,
    arg1: string,
    arg2: string,
): (
    arg1: A[1],
    arg2: A[3],
) => Record<A[0], A[1]> & Record<A[2], A[3]> & Record<'type', string>;
export function makeActionCreator(type, ...argNames) {
    const actionCreator = (...args) => {
        const action = { type };
        argNames.forEach((_, index) => {
            action[argNames[index]] = args[index];
        });
        return action;
    };

    actionCreator.toString = () => type;

    return actionCreator;
}
