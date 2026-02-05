import { createAction, props } from '@ngrx/store';
import { Transaction } from '../../../shared/interface/transaction.interface';

export enum FeatureActionsEnum {
  loadTransactions = '[Feature] Load Transactions',
  writeToReduser = '[Feature] Write To Reduser',
  loadItemsFailure = '[Feature] Load Items Failture',
}

export const loadTransactions = createAction(FeatureActionsEnum.loadTransactions);
export const writeToReduser = createAction(
  FeatureActionsEnum.writeToReduser,
  props<{ trans: Transaction[] }>()
);
export const loadItemsFailure = createAction(
  FeatureActionsEnum.loadItemsFailure,
  props<{ error: string }>()
);
