import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { BackendService } from '../../../shared/services/backend';
import { catchError, map, Observable, of, switchMap } from 'rxjs';
import { Action } from '@ngrx/store';
import {
  FeatureActionsEnum,
  loadItemsFailure,
  loadTransactions,
  writeToReduser,
} from './feature.actions';

// @Injectable()
// export class FeatureEffects {
//   constructor(
//     private actions$: Actions,
//     private back: BackendService
//   ) {}

//   loadTrans = createEffect(() => {
//     return this.actions$.pipe(
//       ofType(loadTransactions),
//       switchMap(() => this.back.getTransaction()),
//       map(trans => {
//         console.log('еффект работает', trans);
//         return writeToReduser({ trans });
//       }),
//       catchError(error => {
//         console.log('ошибка', error);
//         return of(loadItemsFailure({ error: error.message }));
//       })
//     );
//   });
// }

@Injectable()
export class FeatureEffects {
  constructor(
    private actions$: Actions,
    private back: BackendService
  ) {
    console.log('Actions:', this.actions$);
    console.log('Actions type:', typeof this.actions$);
    console.log('Has pipe?', !!this.actions$.pipe);
  }

  loadTrans$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(FeatureActionsEnum.loadTransactions),
      switchMap(() => this.back.getTransaction()),
      map(trans => writeToReduser({ trans })),
      catchError(err => of(loadItemsFailure(err)))
    )
  );
}
