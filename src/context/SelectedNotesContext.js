import { ItemContext } from "./ItemContext";
import createDataContext from "./createDataContext";

class SelectedNotesContext extends ItemContext {
  static notes = [];
}

export const { Context, Provider } = createDataContext(
  SelectedNotesContext.reducer,
  {
    add: SelectedNotesContext.add,
    edit: SelectedNotesContext.edit,
    delete: SelectedNotesContext.delete,
    clear: SelectedNotesContext.clear,
  },
  SelectedNotesContext.notes
);
