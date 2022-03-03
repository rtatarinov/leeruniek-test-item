import { Category } from "../Categories/types";
import { Note } from "../Notes/types";

export type CategoriesWithNotes = Category & {
  notes: Array<Note>;
  subcategories: Array<CategoriesWithNotes>;
};
