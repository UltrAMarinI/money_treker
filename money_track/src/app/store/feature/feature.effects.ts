import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { BackendService } from '../../../shared/services/backend';
import { catchError, map, Observable, of, switchMap } from 'rxjs';
import { Action } from '@ngrx/store';
import { FeatureActionsEnum, loadItemsFailure, writeToReduser } from './feature.actions';
@Injectable()
export class FeatureEffects {
  private actions$ = inject(Actions);
  private back$ = inject(BackendService);

  loadTrans$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(FeatureActionsEnum.loadTransactions),
      switchMap(() => this.back$.getTransaction()),
      map(trans => writeToReduser({ trans })),
      catchError(err => of(loadItemsFailure(err)))
    )
  );
}
