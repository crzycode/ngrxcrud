import { createReducer, on, State } from "@ngrx/store";
import { Books } from "./books";
import { bookapisuccess, deletebookapisuccess, savebookapisuccess, updatebookapisuccess } from "./books.action";

export const intialstate: ReadonlyArray<Books> = [];
export const booksreducer = createReducer(
  intialstate,
  on(bookapisuccess,(state,{allbooks}) => {
    return allbooks

  }),
  on(savebookapisuccess, (state,{data}) => {
    let newState = [...state];
    newState.unshift(data);
    return newState;
  }),
  on(updatebookapisuccess,(state,{data}) => {
    let newState = state.filter(book => book.id !== data.id);
    newState.unshift(data);
    return newState;
  }),
  on(deletebookapisuccess,(state,{id}) => {
    let newState = state.filter(book => book.id !== id);
    return newState;
  })
)
