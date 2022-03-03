import { combineReducers } from "@reduxjs/toolkit";

import { categoriesSlice } from "./features/Categories/store/categoriesSlice";
import { notesSlice } from "./features/Notes/store/notesSlice";

export const rootReducer = combineReducers({
  [categoriesSlice.name]: categoriesSlice.reducer,
  [notesSlice.name]: notesSlice.reducer,
});
