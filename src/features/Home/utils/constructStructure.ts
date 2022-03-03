import { Dictionary, EntityId } from "@reduxjs/toolkit";
import { Category } from "../../Categories/types";
import { Note } from "../../Notes/types";
import { CategoriesWithNotes } from "../types";

type ConstructStructureParams = {
  categoriesIds: Array<EntityId>;
  categories: Dictionary<Category>;
  notesIds: Array<EntityId>;
  notes: Dictionary<Note>;
  groupPlanId: number;
};

type BuildNotesParams = {
  currentCategoryId: EntityId;
  groupPlanId: number;
} & Pick<ConstructStructureParams, "notes" | "notesIds">;

const buildNotes = ({
  notesIds,
  notes,
  currentCategoryId,
  groupPlanId,
}: BuildNotesParams): Array<Note> =>
  notesIds
    .map((id) => notes[id])
    .filter(
      (note): note is Note =>
        note?.categoryId === currentCategoryId &&
        note?.groupPlanId === groupPlanId
    );

export const constructStructure = ({
  categoriesIds = [],
  categories = {},
  notesIds = [],
  notes = {},
  groupPlanId,
}: ConstructStructureParams): Array<CategoriesWithNotes> =>
  categoriesIds.reduce(
    (
      acc: Array<CategoriesWithNotes>,
      currentCategoryId: EntityId
    ): Array<CategoriesWithNotes> => {
      const currentCategory = categories[currentCategoryId];

      if (
        currentCategory?.groupPlanId !== groupPlanId ||
        currentCategory?.isArchived
      ) {
        return acc;
      }

      const subcategoriesIds = categoriesIds.filter(
        (id) => categories[id]?.parentNoteCategoryId === currentCategoryId
      );

      const updatedCategory: CategoriesWithNotes = {
        ...currentCategory,
        notes: buildNotes({ notesIds, notes, currentCategoryId, groupPlanId }),
        subcategories: subcategoriesIds.map((id) => ({
          ...(categories[id] as Category),
          subcategories: [],
          notes: buildNotes({
            notesIds,
            notes,
            currentCategoryId: id,
            groupPlanId,
          }),
        })),
      };

      return [...acc, updatedCategory];
    },
    []
  );
