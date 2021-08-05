import { ItemContext } from "./ItemContext";
import createDataContext from "./createDataContext";

class CalendarContext extends ItemContext {
  static dates = [
    {
      calendarDayIndex: new Date().getDate() - 1,
      monthIndex: 0,
      id: "Selected Date",
    },
  ];
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
