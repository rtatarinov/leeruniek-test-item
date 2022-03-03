import { Category } from "./types";

export const categoriesMock: Array<Category> = [
  {
    id: 1,
    isArchived: false,
    name: "Mathematics",
    parentNoteCategoryId: null,
    groupPlanId: 1,
  },
  {
    id: 2,
    isArchived: false,
    name: "Multiplication",
    parentNoteCategoryId: 1,
    groupPlanId: 1,
  },
  {
    id: 3,
    isArchived: false,
    name: "Division",
    parentNoteCategoryId: 1,
    groupPlanId: 1,
  },
  {
    id: 4,
    isArchived: false,
    name: "Language",
    parentNoteCategoryId: null,
    groupPlanId: 1,
  },
  {
    id: 5,
    isArchived: false,
    name: "Reading",
    parentNoteCategoryId: 4,
    groupPlanId: 1,
  },
  {
    id: 6,
    isArchived: false,
    name: "Spelling",
    parentNoteCategoryId: 4,
    groupPlanId: 1,
  },
  {
    id: 7,
    isArchived: false,
    name: "Individual",
    parentNoteCategoryId: null,
    groupPlanId: 1,
  },
  {
    id: 8,
    isArchived: false,
    name: "Social",
    parentNoteCategoryId: null,
    groupPlanId: 1,
  },
  {
    id: 9,
    isArchived: true,
    name: "Archived category",
    parentNoteCategoryId: null,
    groupPlanId: 1,
  },
];
