import { createAction, props } from "@ngrx/store";
import { Books } from "./books";

export const invokebookapi = createAction("[books api] invoke book api");
export const bookapisuccess = createAction("[booksapi]  book api success",
props<{allbooks:Books[]}>()
);
export const invokesavebookapi = createAction("[booksapi] invoke save book api",
props<{data:Books}>()
);
export const savebookapisuccess = createAction("[booksapi] save book api success",
props<{data:Books}>()
);
export const invokeupdatebookapi = createAction("[booksapi] update book api",
props<{data:Books}>()
)
export const updatebookapisuccess = createAction("[booksapi] success",
props<{data:Books}>()
)

export const invokedeletebookapi = createAction("[booksapi] delete book api",
props<{id:Number}>()
)
export const deletebookapisuccess = createAction("[booksapi] success",
props<{id:Number}>()
)
