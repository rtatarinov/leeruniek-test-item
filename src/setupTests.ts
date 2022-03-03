import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { cleanup } from "@testing-library/react";

global.beforeEach(jest.clearAllMocks);
global.afterEach(cleanup);
