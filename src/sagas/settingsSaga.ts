import { takeLatest, put, select } from "redux-saga/effects";
import { updateSetting } from "../reducers/settings";
import { State } from "../reducers/index";

function* settingsWorker() {
    const settings: State["settings"] = yield select(
        (state: State) => state.settings
    );

    const { fields, groups } = settings;

    const newFields = [...fields];

    groups.forEach((x) => {
        if (!fields.some((f) => f.field === x.field)) {
            newFields.push(x);
        }
    });

    if (newFields.length !== fields.length) {
        yield put(
            updateSetting({
                setting: "fields",
                data: newFields,
            })
        );
    }
}

export function* settingsSaga() {
    yield takeLatest(updateSetting, settingsWorker);
}
