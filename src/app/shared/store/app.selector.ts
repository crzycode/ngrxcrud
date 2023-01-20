import { createFeatureSelector } from "@ngrx/store";
import { Appstate } from "./appstate";

export const selectappstate = createFeatureSelector<Appstate>('appstate');
