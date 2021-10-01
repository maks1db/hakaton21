import { createFetchReducer } from "../../tools/redux-actions";
import { getWorkers} from './appActions'

export const appReducer = createFetchReducer({
    workers: getWorkers.fetchKey([])
})
