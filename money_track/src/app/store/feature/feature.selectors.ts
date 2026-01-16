import { createFeatureSelector, createSelector } from '@ngrx/store';
// import { FeatureState } from './feature.reducer';

// 1. Получаем состояние фичи
export const selectFeatureState = createFeatureSelector<any>('feature');

// 2. Базовые селекторы
export const selectAllItems = createSelector(selectFeatureState, state => state.items);

export const selectItemsLoading = createSelector(selectFeatureState, state => state.loading);

export const selectItemsError = createSelector(selectFeatureState, state => state.error);

// 3. Комбинированные селекторы
export const selectItemsCount = createSelector(selectAllItems, items => items.length);

// // 4. Селектор с параметром
// export const selectItemById = (id: string) =>
//   createSelector(selectAllItems, items => items.find(item => item.id === id));
