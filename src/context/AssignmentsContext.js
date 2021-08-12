import { ItemContext } from "./ItemContext";
import createDataContext from "./createDataContext";

class AssignmentsContext extends ItemContext {
  static assignments = [];
}

export const { Context, Provider } = createDataContext(
  AssignmentsContext.reducer,
  {
    add: AssignmentsContext.add,
    edit: AssignmentsContext.edit,
    delete: AssignmentsContext.delete,
  },
  AssignmentsContext.assignments
);
