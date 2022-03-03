import {
  createSlice,
  createEntityAdapter,
  createSelector,
} from "@reduxjs/toolkit";

import { LoadingStatusEnum } from "../../../common/constants";
import { createAsyncToolkitAction } from "../../../common/store/utils/createAsyncToolkitAction";
import { Note } from "../types";
import { RootState } from "../../../store";
import { fetchNotesErrorsEnum, reducerName } from "../constants";
import { compareDate } from "../../../common/utils/dateAndTime";

type AdditionalFields = {
  fetchNotesLoadingStatus: LoadingStatusEnum;
  fetchNotesError: fetchNotesErrorsEnum | null;
};

export const fetchNotesAction = createAsyncToolkitAction<
  undefined,
  Array<Note>,
  { error: fetchNotesErrorsEnum }
>(
  `${reducerName}/fetchNotes`,
  `${reducerName}/fetchNotesSuccess`,
  `${reducerName}/fetchNotesFailure`
);

const initialAdditionalFields: AdditionalFields = {
  fetchNotesLoadingStatus: LoadingStatusEnum.Initial,
  fetchNotesError: null,
};

const notesAdapter = createEntityAdapter<Note>({
  selectId: (note) => note.id,
  sortComparer: (a, b) => compareDate(a.dateCreated, b.dateCreated),
});

export const notesSlice = createSlice({
  name: reducerName,
  initialState: notesAdapter.getInitialState(initialAdditionalFields),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotesAction.request, (state) => {
        state.fetchNotesError = null;
        state.fetchNotesLoadingStatus = LoadingStatusEnum.Loading;
      })
      .addCase(fetchNotesAction.success, (state, { payload }) => {
        notesAdapter.setAll(state, payload);
        state.fetchNotesLoadingStatus = LoadingStatusEnum.Loaded;
      })
      .addCase(fetchNotesAction.failure, (state, { payload: { error } }) => {
        state.fetchNotesError = error;
        state.fetchNotesLoadingStatus = LoadingStatusEnum.Error;
      });
  },
});

const selectSlice = ({ notes }: RootState) => notes;

export const selectFetchNotesApiLoadingStatus = createSelector(
  selectSlice,
  ({ fetchNotesLoadingStatus }) => fetchNotesLoadingStatus
);

export const selectFetchNotesError = createSelector(
  selectSlice,
  ({ fetchNotesError }) => fetchNotesError
);

export const { selectEntities: selectNotes, selectIds: selectNotesIds } =
  notesAdapter.getSelectors(selectSlice);
