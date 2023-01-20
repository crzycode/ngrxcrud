import { createReducer, on } from "@ngrx/store";

import { setapistatus } from "./app.action";
import { Appstate } from "./appstate";

export const initialstate:Appstate = {
  apiStatus:'',
  apiResponseMessage:''
}

export const appreducer = createReducer(
  initialstate,
  on(setapistatus,(state,{apistatus}) =>{
    return apistatus;
  })
)
