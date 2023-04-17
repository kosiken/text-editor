import { createSelector } from "reselect";
import { selectRootState } from "../../../store/selectors";
import { SCRIPTS_ENUM } from "../../../types";

export const selectAppState = createSelector(
  [selectRootState],
  (state) => state.app
);

export const selectScriptWaveLoaded = (script: SCRIPTS_ENUM) =>
  createSelector([selectAppState], (state) => ({
    loading: state.loading[script],
    loaded: state.loaded[script],
    error: state.error[script],
  }));
