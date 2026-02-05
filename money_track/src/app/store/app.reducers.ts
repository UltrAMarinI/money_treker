import { ActionReducerMap } from '@ngrx/store';
import { AppState } from './app.state';
import { featureReducer } from './feature/feature.reducer';

// Пока пустой, добавим редьюсеры позже
export const reducers: ActionReducerMap<AppState> = {
  // Здесь будем добавлять редьюсеры фич
  feature: featureReducer,
};
