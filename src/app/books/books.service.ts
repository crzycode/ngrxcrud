import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Books } from './store/books';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private http:HttpClient) { }
  get(){
    return this.http.get<Books[]>("http://localhost:3000/books");
  }
  post(data:Books){
    return this.http.post<Books>("http://localhost:3000/books",data);
  }
  update(data:Books){
    return this.http.put<Books>(`http://localhost:3000/books/${data.id}`,data)
  }
  delete(id:Number){
    return this.http.delete(`http://localhost:3000/books/${id}`)
  }
}
