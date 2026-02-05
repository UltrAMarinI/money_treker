import { createReducer, on } from '@ngrx/store';
import { Transaction } from '../../../shared/interface/transaction.interface';
import { writeToReduser } from './feature.actions';
export interface FeatureState {
  trans: Transaction[];
}

export const initialState: FeatureState = {
  trans: [],
};

export const featureReducer = createReducer(
  initialState,
  on(writeToReduser, (_state, { trans }) => {
    return { ..._state, trans };
  })
);
