import {
    assocPath, concat, defaultTo, head, is, when,
} from 'ramda';

import { flow, pipe } from 'fp-ts/lib/function'
import { FetchType } from '../toFetchConst';

export const toObject: (val: any) => any = when(
    is(Array),
    flow(head, defaultTo({})),
);

const fetchHandlers = (fetchType: FetchType) => (
    key: string,
    initialValue: object | [],
) => {
    const isArray = is(Array, initialValue);

    return {
        [fetchType.REQUEST]: state => pipe(
            assocPath([key, 'isFetching'], true, state),
            assocPath([key, 'error'], false),
        ),
        [fetchType.SUCCESS]: (state, result) => {
            /**
             * Temporary for transitional period
             */
            const data = result.response || result.payload;
            return pipe(
                assocPath(
                    [key, 'data'],
                    isArray ? concat(state[key].data, data) : toObject(data),
                    state,
                ),
                assocPath([key, 'isFetching'], false),
            );
        },
        [fetchType.ERROR]: state => pipe(
            assocPath([key, 'isFetching'], false, state),
            assocPath([key, 'error'], true),
        ),
        [fetchType.CLEAR]: state => pipe(
            assocPath([key, 'data'], initialValue, state),
            assocPath([key, 'isFetching'], false),
            assocPath([key, 'error'], false),
        ),
    };
};

export default fetchHandlers;
