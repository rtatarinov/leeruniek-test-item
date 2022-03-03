import React, { FC } from "react";
import { Heading, ListItem, Text, List } from "@chakra-ui/react";
import { isEmpty } from "../../../../common/utils/isEmpty";
import { CategoriesWithNotes } from "../../types";
import { CategoriesListDisplayMode } from "../../constants";
import { formatDate } from "../../../../common/utils/dateAndTime";

type ListProps = {
  item: CategoriesWithNotes;
  displayMode: CategoriesListDisplayMode;
};

export const Item: FC<ListProps> = ({ item, displayMode, children }) => (
  <ListItem
    key={item.id}
    mb={displayMode === CategoriesListDisplayMode.Categories ? 5 : 2}
    mt={displayMode === CategoriesListDisplayMode.Categories ? 0 : 2}
  >
    <Heading
      as={displayMode === CategoriesListDisplayMode.Categories ? "h3" : "h4"}
      size={displayMode === CategoriesListDisplayMode.Categories ? "md" : "sm"}
      color={
        displayMode === CategoriesListDisplayMode.Categories
          ? "teal.700"
          : "teal.500"
      }
      mb={3}
    >
      {item.name}
    </Heading>

    {!isEmpty(item.notes) && (
      <List
        bg="gray.100"
        mb={displayMode === CategoriesListDisplayMode.Categories ? 0 : 4}
      >
        {item.notes.map((note) => (
          <ListItem key={note.id} px={2} py={3}>
            <Text fontSize="sm">
              <Text
                fontSize="sm"
                as="span"
                mr={2}
                color="teal.900"
                fontWeight="semibold"
              >
                {formatDate(note.dateCreated, "DD MMMM YYYY")}
              </Text>

              <Text fontSize="sm" as="span">
                {note.content}
              </Text>
            </Text>
          </ListItem>
        ))}
      </List>
    )}

    {children}
  </ListItem>
);
