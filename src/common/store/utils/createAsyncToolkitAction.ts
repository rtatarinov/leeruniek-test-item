import { createAction } from "@reduxjs/toolkit";

export function createAsyncToolkitAction<TRequest, TResponse, TFailure>(
  requestType: string,
  successType: string,
  failure: string
) {
  return {
    request: createAction<TRequest>(requestType),
    success: createAction<TResponse>(successType),
    failure: createAction<TFailure>(failure),
  };
}
