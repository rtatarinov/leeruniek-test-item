export type Category = {
  id: number;
  isArchived: boolean;
  name: string;
  parentNoteCategoryId: number | null;
  groupPlanId: number;
};
