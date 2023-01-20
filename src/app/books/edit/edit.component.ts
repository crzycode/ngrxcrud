import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { switchMap } from 'rxjs';
import { setapistatus } from 'src/app/shared/store/app.action';
import { selectappstate } from 'src/app/shared/store/app.selector';
import { Appstate } from 'src/app/shared/store/appstate';
import { Books } from '../store/books';
import {
  invokesavebookapi,
  invokeupdatebookapi,
  updatebookapisuccess,
} from '../store/books.action';
import { selectbooksbyid } from '../store/books.selector';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  constructor(
    private store: Store,
    private activate: ActivatedRoute,
    private router: Router,
    private appstore: Store<Appstate>
  ) {}
  bookform: Books = {
    id: 0,
    author: '',
    title: '',
    cost: 0,
  };

  ngOnInit(): void {
    let fetchfromdata$ = this.activate.paramMap.pipe(
      switchMap((params) => {
        var id = Number(params.get('id'));
        return this.store.pipe(select(selectbooksbyid(id)));
      })
    );
    fetchfromdata$.subscribe((books) => {

      if (books) {
        this.bookform = { ...books };
      } else {
        this.router.navigate(['/']);
      }
    });
  }

  Update() {
    this.store.dispatch(invokeupdatebookapi({ data: { ...this.bookform } }));
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
