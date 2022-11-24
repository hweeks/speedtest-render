import { RESULT_ACTIONS, REDUCER_RESULT_ACTIONS } from "./actions";
import produce from "immer";
import { BACKEND_CONFIG } from "./constants";

export type results_state = {
  results?: BACKEND_CONFIG["LIST_RESULTS"]["response"];
  is_loading: boolean;
  error?: string;
};

const initial_state: results_state = {
  results: undefined,
  is_loading: false,
  error: undefined,
};

const results_fetching = (state) => {
  state.is_loading = true;
};

const results_fetched = (state, payload) => {
  state.is_loading = false;
  state.results = payload;
};

const results_failed = (state, payload) => {
  state.is_loading = false;
  state.error = payload;
};

export default (state = initial_state, action: REDUCER_RESULT_ACTIONS) =>
  produce(state, (draft) => {
    switch (action.type) {
      case RESULT_ACTIONS.GET_RESULTS:
        return results_fetching(draft);
      case RESULT_ACTIONS.RECEIVE_RESULTS:
        return results_fetched(draft, action.payload);
      case RESULT_ACTIONS.FAIL_RESULTS:
        return results_failed(draft, action.payload);
    }
  });
