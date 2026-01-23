import { createAction, props } from '@ngrx/store';
import { Transaction } from '../../../shared/interface/transaction.interface';

export enum FeatureActionsEnum {
  loadTransactions = '[Feature] Load Transactions',
  writeToReduser = '[Feature] Write To Reduser',
  loadItemsFailure = '[Feature] Load Items Failture',
}

// export class loadTransactions implements Action {
//   readonly type = FeatureActionsEnum.loadItemsFailure;
// }

// export class writeToReduser implements Action {
//   readonly type = FeatureActionsEnum.writeToReduser;
//   constructor(public trans: Transaction[]) {}
// }

// export class loadItemsFailure implements Action {
//   readonly type = FeatureActionsEnum.loadItemsFailure;
//   constructor(public error: any) {}
// }

export const loadTransactions = createAction(FeatureActionsEnum.loadTransactions);
export const writeToReduser = createAction(
  FeatureActionsEnum.writeToReduser,
  props<{ trans: Transaction[] }>()
);
// export const errorOutput = createAction('[Feature] Error Output');
export const loadItemsFailure = createAction(
  FeatureActionsEnum.loadItemsFailure,
  props<{ error: string }>()
);

// // 1. Простые actions (без данных)
// export const loadItems = createAction('[Feature] Load Item');

// // 2. Actions с данными
// export const addItems = createAction('[Feature] Add Item', props<{ item: any }>());

// // 3. Для асинхронных операций (успех/ошибка)
// export const loadItemsSuccess = createAction(
//   '[Feature] Load Items Success',
//   props<{ items: any[] }>()
// );

// export const loadItemsFailure = createAction(
//   '[Feature] Load Items Failture',
//   props<{ error: string }>()
// );
