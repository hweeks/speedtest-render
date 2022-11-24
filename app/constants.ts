import { ActionCreator, Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { speed_result } from "../src";

export type thunk_builder<
  action_returned = Promise<Action>,
  state_to_mutate = any
> = ActionCreator<
  ThunkAction<action_returned, state_to_mutate, void, Action<any>>
>;

export enum BACKEND_ROUTES {
  LIST_RESULTS = "/api/results",
  GET_RESULT = "/api/results/:timestamp",
}

export type BACKEND_CONFIG = {
  LIST_RESULTS: {
    url: BACKEND_ROUTES.LIST_RESULTS;
    request: null;
    response: speed_result[];
  };
  GET_RESULT: {
    url: BACKEND_ROUTES.GET_RESULT;
    request: { timestamp: string };
    response: speed_result;
  };
};

export const get_url = (
  path_stub: BACKEND_ROUTES,
  optional_replacer?: Record<string, string>
): URL => {
  if (optional_replacer) {
    for (const replacement_value in optional_replacer) {
      path_stub.replace(
        replacement_value,
        optional_replacer[replacement_value]
      );
    }
  }
  const built_url = new URL(path_stub, "http://localhost:8080");
  return built_url;
};
