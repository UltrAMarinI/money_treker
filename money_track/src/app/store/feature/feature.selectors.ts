import { createFeatureSelector } from '@ngrx/store';
import { Transaction } from '../../../shared/interface/transaction.interface';

export const selectFeatureState = createFeatureSelector<Transaction[]>('trans');
