import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { setapistatus } from 'src/app/shared/store/app.action';
import { selectappstate } from 'src/app/shared/store/app.selector';
import { Appstate } from 'src/app/shared/store/appstate';
import { Books } from '../store/books';
import { invokesavebookapi } from '../store/books.action';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  constructor(private store:Store,
    private appstore:Store<Appstate>,
    private router:Router
    ) { }
  bookform:Books = {
    id: 0,
    author: '',
    title: '',
    cost: 0,
  }

  ngOnInit(): void {
  }
  addbooks(){
    this.store.dispatch(invokesavebookapi({data:{...this.bookform}}))
    let appstate$ = this.appstore.pipe(select(selectappstate))
    appstate$.subscribe((data) =>{
      if(data.apiStatus == 'success'){
        this.appstore.dispatch(setapistatus({apistatus:{apiStatus:'',apiResponseMessage:''}}))
        this.router.navigate(['/'])
      }
    })
  }
}
