import React from "react";
import { useSelector, useDispatch, Provider } from "react-redux";
import { ChakraProvider } from "@chakra-ui/react";
import { render, screen } from "@testing-library/react";
import { store } from "../../../store";
import { Home, HomeProps } from "../Home";
import { fetchCategoriesAction } from "../../Categories/store/categoriesSlice";
import { fetchNotesAction } from "../../Notes/store/notesSlice";
import { LoadingStatusEnum } from "../../../common/constants";
import { fetchCategoriesErrorsEnum } from "../../Categories/constants";
import { fetchNotesErrorsEnum } from "../../Notes/constants";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn() as jest.Mock,
  useDispatch: jest.fn(),
}));

jest.mock("../../Categories/store/categoriesSlice", () => ({
  ...jest.requireActual("../../Categories/store/categoriesSlice"),
  fetchCategoriesAction: {
    request: jest.fn(),
    success: jest.fn(),
    failure: jest.fn(),
  },
}));

jest.mock("../../Notes/store/notesSlice", () => ({
  ...jest.requireActual("../../Notes/store/notesSlice"),
  fetchCategoriesAction: {
    request: jest.fn(),
    success: jest.fn(),
    failure: jest.fn(),
  },
}));

const mockedUseSelector = useSelector as jest.Mock;
const mockedUseDispatch = useDispatch as jest.Mock;

export const wrapper = (component: React.ReactNode) => {
  return render(
    <Provider store={store}>
      <ChakraProvider>{component}</ChakraProvider>
    </Provider>
  );
};

describe("features/Home", () => {
  let props: HomeProps;

  const FAKE_PLAN_ID = 1;

  const FAKE_STATE = {
    categories: {
      fetchCategoriesLoadingStatus: LoadingStatusEnum.Initial,
      fetchCategoriesError: null,
      ids: [],
      entities: {},
    },
    notes: {
      fetchNotesLoadingStatus: LoadingStatusEnum.Initial,
      fetchNotesError: null,
      ids: [],
      entities: {},
    },
  };

  beforeEach(() => {
    props = {
      groupPlanId: FAKE_PLAN_ID,
    };

    mockedUseSelector.mockImplementation((callback) =>
      callback({ ...FAKE_STATE })
    );

    mockedUseDispatch.mockReturnValue(jest.fn());
  });

  afterEach(() => {
    mockedUseSelector.mockClear();
    mockedUseDispatch.mockClear();
  });

  describe("render", () => {
    it("should be a component", () => {
      expect(Home).toBeInstanceOf(Function);
    });

    describe("isLoading state", () => {
      it("should render spinner when isLoading of categories", () => {
        mockedUseSelector.mockImplementation((callback) =>
          callback({
            ...FAKE_STATE,
            categories: {
              ...FAKE_STATE.categories,
              fetchCategoriesLoadingStatus: LoadingStatusEnum.Loading,
            },
          })
        );

        wrapper(<Home {...props} />);
        const spinner = screen.getByTestId("spinner-node");

        expect(spinner).toBeInTheDocument();
      });

      it("shouldn't render error when isLoading of categories", () => {
        mockedUseSelector.mockImplementation((callback) =>
          callback({
            ...FAKE_STATE,
            categories: {
              ...FAKE_STATE.categories,
              fetchCategoriesLoadingStatus: LoadingStatusEnum.Loading,
            },
          })
        );

        wrapper(<Home {...props} />);
        const error = screen.queryByTestId("error-node");

        expect(error).not.toBeInTheDocument();
      });

      it("shouldn't render empty messages when isLoading of categories", () => {
        mockedUseSelector.mockImplementation((callback) =>
          callback({
            ...FAKE_STATE,
            categories: {
              ...FAKE_STATE.categories,
              fetchCategoriesLoadingStatus: LoadingStatusEnum.Loading,
            },
          })
        );

        wrapper(<Home {...props} />);
        const error = screen.queryByText(/no notes created/i);

        expect(error).not.toBeInTheDocument();
      });

      it("shouldn't render list of categories when isLoading of categories", () => {
        mockedUseSelector.mockImplementation((callback) =>
          callback({
            ...FAKE_STATE,
            categories: {
              ...FAKE_STATE.categories,
              fetchCategoriesLoadingStatus: LoadingStatusEnum.Loading,
            },
          })
        );

        wrapper(<Home {...props} />);
        const error = screen.queryByTestId("categories-list-node");

        expect(error).not.toBeInTheDocument();
      });

      it("should render spinner when isLoading of notes", () => {
        mockedUseSelector.mockImplementation((callback) =>
          callback({
            ...FAKE_STATE,
            notes: {
              ...FAKE_STATE.notes,
              fetchNotesLoadingStatus: LoadingStatusEnum.Loading,
            },
          })
        );

        wrapper(<Home {...props} />);
        const spinner = screen.getByTestId("spinner-node");

        expect(spinner).toBeInTheDocument();
      });

      it("shouldn't render error when isLoading of notes", () => {
        mockedUseSelector.mockImplementation((callback) =>
          callback({
            ...FAKE_STATE,
            notes: {
              ...FAKE_STATE.notes,
              fetchNotesLoadingStatus: LoadingStatusEnum.Loading,
            },
          })
        );

        wrapper(<Home {...props} />);
        const error = screen.queryByTestId("error-node");

        expect(error).not.toBeInTheDocument();
      });

      it("shouldn't render empty messages when isLoading of notes", () => {
        mockedUseSelector.mockImplementation((callback) =>
          callback({
            ...FAKE_STATE,
            notes: {
              ...FAKE_STATE.notes,
              fetchNotesLoadingStatus: LoadingStatusEnum.Loading,
            },
          })
        );

        wrapper(<Home {...props} />);
        const error = screen.queryByText(/no notes created/i);

        expect(error).not.toBeInTheDocument();
      });

      it("shouldn't render list of categories when isLoading of notes", () => {
        mockedUseSelector.mockImplementation((callback) =>
          callback({
            ...FAKE_STATE,
            notes: {
              ...FAKE_STATE.notes,
              fetchNotesLoadingStatus: LoadingStatusEnum.Loading,
            },
          })
        );

        wrapper(<Home {...props} />);
        const error = screen.queryByTestId("categories-list-node");

        expect(error).not.toBeInTheDocument();
      });
    });

    describe("error state", () => {
      it("should render error when fetchCategories error", () => {
        mockedUseSelector.mockImplementation((callback) =>
          callback({
            ...FAKE_STATE,
            categories: {
              ...FAKE_STATE.categories,
              fetchCategoriesError: fetchCategoriesErrorsEnum.Unknown,
            },
          })
        );

        wrapper(<Home {...props} />);
        const error = screen.queryByText(/cannot get categories/i);

        expect(error).toBeInTheDocument();
      });

      it("should render error when fetchNotes error", () => {
        mockedUseSelector.mockImplementation((callback) =>
          callback({
            ...FAKE_STATE,
            notes: {
              ...FAKE_STATE.notes,
              fetchNotesError: fetchNotesErrorsEnum.Unknown,
            },
          })
        );

        wrapper(<Home {...props} />);
        const error = screen.queryByText(/cannot get notes/i);

        expect(error).toBeInTheDocument();
      });
    });
  });

  describe("invoke", () => {
    it("should calls 'fetchCategoriesAction.request'", () => {
      wrapper(<Home {...props} />);

      expect(
        mockedUseDispatch(fetchCategoriesAction.request())
      ).toHaveBeenCalled();
    });

    it("should calls 'fetchNotesAction.request'", () => {
      wrapper(<Home {...props} />);

      expect(mockedUseDispatch(fetchNotesAction.request())).toHaveBeenCalled();
    });
  });
});
