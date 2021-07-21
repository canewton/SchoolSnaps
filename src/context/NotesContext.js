import { ItemContext } from "./ItemContext";
import { SchoolClass } from "../classes/SchoolClass";
import createDataContext from "./createDataContext";

class NotesContext extends ItemContext {
  static notes = [];
}

export const { Context, Provider } = createDataContext(
  NotesContext.reducer,
  {
    add: NotesContext.add,
    edit: NotesContext.edit,
    delete: NotesContext.delete,
  },
  NotesContext.notes
);
