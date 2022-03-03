import React, { Fragment, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, AlertIcon, Box, List, Spinner, Text } from "@chakra-ui/react";

import { LoadingStatusEnum } from "../../common/constants";
import {
  fetchCategoriesAction,
  selectCategories,
  selectCategoriesId,
  selectFetchCategoriesApiLoadingStatus,
  selectFetchCategoriesError,
} from "../Categories/store/categoriesSlice";
import {
  fetchNotesAction,
  selectFetchNotesApiLoadingStatus,
  selectFetchNotesError,
  selectNotes,
  selectNotesIds,
} from "../Notes/store/notesSlice";
import { isEmpty } from "../../common/utils/isEmpty";
import { constructStructure } from "./utils/constructStructure";
import { CategoriesWithNotes } from "./types";
import { Item } from "./components/Item/Item";
import { CategoriesListDisplayMode } from "./constants";

export type HomeProps = {
  groupPlanId: number;
};

export const Home = ({ groupPlanId }: HomeProps) => {
  const dispatch = useDispatch();

  const fetchCategoriesApiLoadingStatus = useSelector(
    selectFetchCategoriesApiLoadingStatus
  );

  const fetchNotesApiLoadingStatus = useSelector(
    selectFetchNotesApiLoadingStatus
  );

  const fetchCategoriesError = useSelector(selectFetchCategoriesError);
  const fetchNotesError = useSelector(selectFetchNotesError);

  const categoriesIds = useSelector(selectCategoriesId);
  const categories = useSelector(selectCategories);

  const notesIds = useSelector(selectNotesIds);
  const notes = useSelector(selectNotes);

  const categoriesWithNotes = useMemo<Array<CategoriesWithNotes>>(
    () =>
      constructStructure({
        categoriesIds,
        categories,
        notesIds,
        notes,
        groupPlanId,
      }),
    [categoriesIds, categories, notesIds, notes, groupPlanId]
  );

  const content = useMemo(() => {
    switch (true) {
      case [
        fetchCategoriesApiLoadingStatus,
        fetchNotesApiLoadingStatus,
      ].includes(LoadingStatusEnum.Loading):
        return (
          <Spinner
            size="lg"
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            data-testid="spinner-node"
          />
        );

      case fetchCategoriesError !== null:
      case fetchNotesError !== null:
        return (
          <Alert status="error" data-testid="error-node">
            <AlertIcon />
            {fetchCategoriesError !== null
              ? "Cannot get categories"
              : "Cannot get notes"}
          </Alert>
        );

      case isEmpty(categoriesWithNotes):
        return (
          <Text fontSize="l" color="gray.500">
            No notes created
          </Text>
        );

      case !isEmpty(categoriesWithNotes):
        return (
          <List data-testid="categories-list-node">
            {categoriesWithNotes.map((category) => (
              <Fragment key={category.id}>
                <Item
                  item={category}
                  displayMode={CategoriesListDisplayMode.Categories}
                >
                  {!isEmpty(category.subcategories) && (
                    <List ml={30}>
                      {category.subcategories.map((subcategory) => (
                        <Item
                          item={subcategory}
                          key={subcategory.id}
                          displayMode={CategoriesListDisplayMode.SubCategories}
                        />
                      ))}
                    </List>
                  )}
                </Item>
              </Fragment>
            ))}
          </List>
        );

      default:
        return null;
    }
  }, [
    fetchCategoriesApiLoadingStatus,
    fetchNotesApiLoadingStatus,
    fetchCategoriesError,
    fetchNotesError,
    categoriesWithNotes,
  ]);

  useEffect(() => {
    dispatch(fetchCategoriesAction.request());
    dispatch(fetchNotesAction.request());
  }, [dispatch]);

  return <Box position="relative">{content}</Box>;
};
