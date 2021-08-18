import { ItemContext } from "./ItemContext";
import createDataContext from "./createDataContext";

class CalendarContext extends ItemContext {
  static dates = [{ id: "Selected Date" }];
}

export const { Context, Provider } = createDataContext(
  CalendarContext.reducer,
  {
    add: CalendarContext.add,
    edit: CalendarContext.edit,
    delete: CalendarContext.delete,
  },
  CalendarContext.dates
);
