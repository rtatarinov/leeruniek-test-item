import { SagaIterator } from "redux-saga";
import { call, put, takeLatest } from "redux-saga/effects";
import { sleep } from "../../../common/utils/sleep";
import { fetchCategoriesAction } from "./categoriesSlice";
import { categoriesMock } from "../mock";
import { fetchCategoriesErrorsEnum } from "../constants";

function* fetchCategoriesTask(): SagaIterator {
  try {
    yield call(sleep, 1500);
    yield put(fetchCategoriesAction.success(categoriesMock));
  } catch (e) {
    yield put(
      fetchCategoriesAction.failure({
        error: fetchCategoriesErrorsEnum.Unknown,
      })
    );
  }
}

export const watchCategories = function* (): SagaIterator {
  yield takeLatest(fetchCategoriesAction.request, fetchCategoriesTask);
};
