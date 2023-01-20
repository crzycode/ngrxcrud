import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { select, Store } from "@ngrx/store";
import { EMPTY, map, switchMap, withLatestFrom } from "rxjs";
import { Action } from "rxjs/internal/scheduler/Action";
import { setapistatus } from "src/app/shared/store/app.action";
import { Appstate } from "src/app/shared/store/appstate";
import { BooksService } from "../books.service";
import { bookapisuccess, deletebookapisuccess, invokebookapi, invokedeletebookapi, invokesavebookapi, invokeupdatebookapi, savebookapisuccess, updatebookapisuccess } from "./books.action";
import { selectBooks } from "./books.selector";

@Injectable()
export class BooksEffect {
  /**
   *
   */
  constructor(private action$:Actions,
    private books:BooksService,
    private appstore:Store<Appstate>,
    private store:Store
    ) {
  }

  loadallbooks$ = createEffect(() =>
    this.action$.pipe(
      ofType(invokebookapi),
      withLatestFrom(this.store.pipe(select(selectBooks))),
      switchMap( ([,booksfromstore]) => {
        if(booksfromstore.length > 0){
          return EMPTY;
        }
        return this.books.get().pipe(
          map((data) => bookapisuccess({allbooks: data}))
        )
      })
  )
  )
  savenewbooks$ = createEffect(() => this.action$.pipe(
    ofType(invokesavebookapi),
    switchMap( (action) => {
      this.appstore.dispatch(setapistatus({apistatus:{apiResponseMessage:'',apiStatus:''}}))
      return this.books.post(action.data).pipe(
        map((dat) => {
          this.appstore.dispatch(setapistatus({apistatus:{apiResponseMessage:'',apiStatus:'success'}}))
          return savebookapisuccess({data:dat})
        })
      )
    })
  ))
  updatebooks$ = createEffect(() => this.action$.pipe(
    ofType(invokeupdatebookapi),
    switchMap( (action) => {
      this.appstore.dispatch(setapistatus({apistatus:{apiResponseMessage:'',apiStatus:''}}))
      return this.books.update(action.data).pipe(
        map((dat) => {
          this.appstore.dispatch(setapistatus({apistatus:{apiResponseMessage:'',apiStatus:'success'}}))
          return updatebookapisuccess({data:dat})
        })
      )
    })
  ))

  deletebooks$ = createEffect(() => this.action$.pipe(
    ofType(invokedeletebookapi),
    switchMap( (action) => {
      this.appstore.dispatch(setapistatus({apistatus:{apiResponseMessage:'',apiStatus:''}}))
      return this.books.delete(action.id).pipe(
        map((dat) => {
          this.appstore.dispatch(setapistatus({apistatus:{apiResponseMessage:'',apiStatus:'success'}}))
          return deletebookapisuccess({id:action.id})
        })
      )
    })
  ))
}
