import React from "react";
import { Provider } from "react-redux";
import { ChakraProvider } from "@chakra-ui/react";
import { store } from "./store";
import { HomePage } from "./pages/Home/HomePage";

export const App = () => (
  <Provider store={store}>
    <ChakraProvider>
      <HomePage />
    </ChakraProvider>
  </Provider>
);
