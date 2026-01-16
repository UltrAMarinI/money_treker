import { createAction, props } from '@ngrx/store';

// 1. Простые actions (без данных)
export const loadItems = createAction('[Feature] Load Item');
export const clearItems = createAction('[Feature] Clear Item');

// 2. Actions с данными
export const addItems = createAction('[Feature] Add Item', props<{ item: any }>());

export const updateItem = createAction(
  '[Feature] Update Item',
  props<{ id: string; changes: any }>()
);

export const deleteItem = createAction('[Feature] Delete Item', props<{ id: string }>());

// 3. Для асинхронных операций (успех/ошибка)
export const loadItemsSuccess = createAction(
  '[Feature] Load Items Success',
  props<{ items: any[] }>()
);

export const loadItemsFailure = createAction(
  '[Feature] Load Items Failture',
  props<{ error: string }>()
);
