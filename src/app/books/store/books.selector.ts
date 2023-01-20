import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Books } from "./books";

export const selectBooks = createFeatureSelector<Books[]>("mybooks");

export const selectbooksbyid = (bookid:number) => {
  return createSelector(
    selectBooks,
    (books:Books[]) =>{
      var bookbyid = books.filter(_ => _.id !== bookid);
      if(bookbyid.length === 0) {
        return null;

      }else{
        return bookbyid[0];
      }
    }
  )
}
