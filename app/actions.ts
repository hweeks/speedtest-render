import { Action } from "redux";
import {
  BACKEND_CONFIG,
  BACKEND_ROUTES,
  get_url,
  thunk_builder,
} from "./constants";

export enum RESULT_ACTIONS {
  GET_RESULTS = "GET_RESULTS",
  RECEIVE_RESULTS = "RECEIVE_RESULTS",
  FAIL_RESULTS = "FAIL_RESULTS",
}

export type GET_RESULT_ACTION = Action<RESULT_ACTIONS.GET_RESULTS>;

export type RECEIVE_RESULTS_ACTION = Action<RESULT_ACTIONS.RECEIVE_RESULTS> & {
  payload: BACKEND_CONFIG["LIST_RESULTS"]["response"];
};

export type FAIL_RESULTS_ACTION = Action<RESULT_ACTIONS.FAIL_RESULTS> & {
  payload: string;
};

export type REDUCER_RESULT_ACTIONS =
  | GET_RESULT_ACTION
  | RECEIVE_RESULTS_ACTION
  | FAIL_RESULTS_ACTION;

const fetching_results = (): GET_RESULT_ACTION => ({
  type: RESULT_ACTIONS.GET_RESULTS,
});

const fetched_results = (payload): RECEIVE_RESULTS_ACTION => ({
  type: RESULT_ACTIONS.RECEIVE_RESULTS,
  payload,
});

const failed_results = (payload: string): FAIL_RESULTS_ACTION => ({
  type: RESULT_ACTIONS.FAIL_RESULTS,
  payload,
});

export const execute_result_search = async () => {
  const fetch_url = get_url(BACKEND_ROUTES.GET_RESULT);
  const response = await fetch(fetch_url.toString());
  const searchResults: BACKEND_CONFIG["GET_RESULT"]["response"] =
    await response.json();
  return searchResults;
};

export const search_results: thunk_builder = () => {
  return (dispatch) => {
    dispatch(fetching_results());
    return execute_result_search()
      .then((res) => dispatch(fetched_results(res)))
      .catch((err) => dispatch(failed_results(err)));
  };
};
