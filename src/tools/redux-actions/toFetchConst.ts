export type FetchType = Record<'ERROR', string> &
    Record<'REQUEST', string> &
    Record<'SUCCESS', string> &
    Record<'CLEAR', string>;

type FetchConst = (actionType: string) => FetchType;

const fetchConst: FetchConst = constant => ({
    CLEAR: `${constant}_CLEAR`,
    ERROR: `${constant}_ERROR`,
    REQUEST: `${constant}_REQUEST`,
    SUCCESS: `${constant}_SUCCESS`,
});

export default fetchConst;
