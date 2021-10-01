import { createAction, makeAsyncActionCreator } from "../../tools/redux-actions";
import { WorkerDTO } from '../../types'

export const initApp = createAction('INIT_APP');
export const getWorkers = makeAsyncActionCreator<WorkerDTO[]>('GET_WORKERS')