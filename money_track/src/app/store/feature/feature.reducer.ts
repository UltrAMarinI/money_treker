import { createReducer } from '@ngrx/store';

export interface TestState {
  message: string;
}

export const initialState: TestState = {
  message: 'Store работает!',
};

export const testReducer = createReducer(initialState);

// import { createReducer, on } from '@ngrx/store';
// import * as FeatureActions from './feature.actions';

// // 1. Интерфейс состояния фичи
// export interface FeatureState {
//   items: any[]; // Массив элементов
//   loading: boolean; // Флаг загрузки
//   error: string | null; // Ошибка
// }

// // 2. Начальное состояние
// export const initialState: FeatureState = {
//   items: [],
//   loading: false,
//   error: null,
// };

// // 3. Создаем редьюсер
// export const featureReducer = createReducer(
//   initialState,

//   // Обработка actions
//   on(FeatureActions.addItems, (state, { item }) => ({
//     ...state,
//     items: [...state.items, item],
//   })),

//   on(FeatureActions.deleteItem, (state, { id }) => ({
//     ...state,
//     items: state.items.filter(item => item.id !== id),
//   })),

//   on(FeatureActions.clearItems, state => ({
//     ...state,
//     items: [],
//   })),

//   on(FeatureActions.loadItems, state => ({
//     ...state,
//     loading: true,
//   })),

//   on(FeatureActions.loadItemsSuccess, (state, { items }) => ({
//     ...state,
//     items,
//     loading: false,
//   })),

//   on(FeatureActions.loadItemsFailure, (state, { error }) => ({
//     ...state,
//     error,
//     loading: false,
//   }))
// );
