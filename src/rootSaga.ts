import { all, fork } from "redux-saga/effects";
import { SagaIterator } from "@redux-saga/core";
import { watchCategories } from "./features/Categories/store/categoriesSaga";
import { watchNotes } from "./features/Notes/store/notesSaga";

export function* rootSaga(): SagaIterator {
  yield all([watchCategories, watchNotes].map((saga) => fork(saga)));
}
