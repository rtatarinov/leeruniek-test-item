import React from "react";
import { Container, Heading, Text } from "@chakra-ui/react";
import { Home } from "../../features/Home/Home";

const PLAN = {
  id: 1,
  name: "Group plan M/E",
  userCreated: "John Doe",
};

export const HomePage = () => (
  <Container maxW="container.xl" pt={5}>
    <Heading as="h2" size="xl" mb={2}>
      {PLAN.name}
    </Heading>

    <Text fontSize="xl" color="gray.500" mb={10}>
      {PLAN.userCreated}
    </Text>

    <Home groupPlanId={PLAN.id} />
  </Container>
);
