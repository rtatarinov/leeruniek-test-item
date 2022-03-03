import { SagaIterator } from "redux-saga";
import { call, put, takeLatest } from "redux-saga/effects";
import { sleep } from "../../../common/utils/sleep";
import { fetchNotesAction } from "./notesSlice";
import { notesMock } from "../mock";
import { fetchNotesErrorsEnum } from "../constants";

function* fetchNotesTask(): SagaIterator {
  try {
    yield call(sleep, 1500);
    yield put(fetchNotesAction.success(notesMock));
  } catch (e) {
    yield put(
      fetchNotesAction.failure({
        error: fetchNotesErrorsEnum.Unknown,
      })
    );
  }
}

export const watchNotes = function* (): SagaIterator {
  yield takeLatest(fetchNotesAction.request, fetchNotesTask);
};
