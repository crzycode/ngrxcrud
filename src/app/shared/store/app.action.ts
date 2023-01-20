import { createAction, props } from "@ngrx/store";
import { Appstate } from "./appstate";

export const setapistatus = createAction(
  "[api] success or failure status",
  props<{apistatus:Appstate}>()
)
