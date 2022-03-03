import {
  createSlice,
  createEntityAdapter,
  createSelector,
} from "@reduxjs/toolkit";

import { LoadingStatusEnum } from "../../../common/constants";
import { createAsyncToolkitAction } from "../../../common/store/utils/createAsyncToolkitAction";
import { Category } from "../types";
import { RootState } from "../../../store";
import { fetchCategoriesErrorsEnum, reducerName } from "../constants";

type AdditionalFields = {
  fetchCategoriesLoadingStatus: LoadingStatusEnum;
  fetchCategoriesError: fetchCategoriesErrorsEnum | null;
};

export const fetchCategoriesAction = createAsyncToolkitAction<
  undefined,
  Array<Category>,
  { error: fetchCategoriesErrorsEnum }
>(
  `${reducerName}/fetchCategories`,
  `${reducerName}/fetchCategoriesSuccess`,
  `${reducerName}/fetchCategoriesFailure`
);

const initialAdditionalFields: AdditionalFields = {
  fetchCategoriesLoadingStatus: LoadingStatusEnum.Initial,
  fetchCategoriesError: null,
};

const categoriesAdapter = createEntityAdapter<Category>({
  selectId: (category) => category.id,
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

export const categoriesSlice = createSlice({
  name: reducerName,
  initialState: categoriesAdapter.getInitialState(initialAdditionalFields),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoriesAction.request, (state) => {
        state.fetchCategoriesError = null;
        state.fetchCategoriesLoadingStatus = LoadingStatusEnum.Loading;
      })
      .addCase(fetchCategoriesAction.success, (state, { payload }) => {
        categoriesAdapter.setAll(state, payload);
        state.fetchCategoriesLoadingStatus = LoadingStatusEnum.Loaded;
      })
      .addCase(
        fetchCategoriesAction.failure,
        (state, { payload: { error } }) => {
          state.fetchCategoriesError = error;
          state.fetchCategoriesLoadingStatus = LoadingStatusEnum.Error;
        }
      );
  },
});

const selectSlice = ({ categories }: RootState) => categories;

export const selectFetchCategoriesApiLoadingStatus = createSelector(
  selectSlice,
  ({ fetchCategoriesLoadingStatus }) => fetchCategoriesLoadingStatus
);

export const selectFetchCategoriesError = createSelector(
  selectSlice,
  ({ fetchCategoriesError }) => fetchCategoriesError
);

export const {
  selectIds: selectCategoriesId,
  selectEntities: selectCategories,
} = categoriesAdapter.getSelectors(selectSlice);
