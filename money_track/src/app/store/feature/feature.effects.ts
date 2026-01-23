// import { Injectable } from '@angular/core';
// import { Actions, createEffect, ofType } from '@ngrx/effects';
// import { BackendService } from '../../../shared/services/backend';
// import { loadItemsFailure, loadTransactions, writeToReduser } from './feature.actions';
// import { catchError, map, of, switchMap } from 'rxjs';

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { BackendService } from '../../../shared/services/backend';
import { catchError, map, Observable, of, switchMap } from 'rxjs';
import { Action } from '@ngrx/store';
import { FeatureActionsEnum, loadItemsFailure, writeToReduser } from './feature.actions';

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

// // 1. Импорты
// import { Injectable } from '@angular/core';
// import { Actions, createEffect, ofType } from '@ngrx/effects';
// import { of } from 'rxjs';
// import { catchError, map, switchMap } from 'rxjs/operators';
// import * as FeatureActions from './feature.actions';

// // 2. Декоратор
// @Injectable()
// export class FeatureEffects {
//   // 3. Конструктор с private actions$
//   constructor(private actions$: Actions) {
//     console.log('Actions:', this.actions$);
//     console.log('Actions type:', typeof this.actions$);
//     console.log('Has pipe?', !!this.actions$.pipe);
//   } // ← КЛЮЧЕВОЙ МОМЕНТ!

//   // 4. Effect с правильным именем ($ в конце)
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
      map(res => new writeToReduser(res)),
      catchError(err => of(new loadItemsFailure(err)))
    )
  );
}
