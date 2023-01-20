import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { setapistatus } from 'src/app/shared/store/app.action';
import { selectappstate } from 'src/app/shared/store/app.selector';
import { Appstate } from 'src/app/shared/store/appstate';
import { invokebookapi, invokedeletebookapi } from '../store/books.action';
import { selectBooks } from '../store/books.selector';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private store:Store,
    private appstore:Store<Appstate>,
    private router:Router
    ) { }

  books$ = this.store.pipe(select(selectBooks))

  ngOnInit(): void {
      this.store.dispatch(invokebookapi())
  }

  deletecard(ids:number){
this.store.dispatch(invokedeletebookapi({id:ids}))
let appstate$ = this.appstore.pipe(select(selectappstate));
appstate$.subscribe((data) => {
  if (data.apiStatus == 'success') {
    this.appstore.dispatch(
      setapistatus({ apistatus: { apiStatus: '', apiResponseMessage: '' } })
    );
    this.router.navigate(['/']);
  }
});
  }
}
