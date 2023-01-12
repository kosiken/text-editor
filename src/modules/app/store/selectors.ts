import {createSelector} from 'reselect';
import { selectRootState } from '../../../store/selectors';

export const selectAppState = createSelector(
    [selectRootState],
    state => state.app,
  );

export const selectMessage = createSelector(
  [selectAppState],
  state => state.message || ''
);

export const selectMessageType = createSelector(
  [selectAppState],
  state => state.messageType
);