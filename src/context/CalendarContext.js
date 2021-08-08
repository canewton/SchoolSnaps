import { ItemContext } from "./ItemContext";
import createDataContext from "./createDataContext";

class CalendarContext extends ItemContext {
  static dates = [
    {
      dateObject: {
        calendarDayIndex: new Date().getDate() - 1,
        day: new Date().getDate(),
        monthIndex: 0,
        weekIndex: Math.round(new Date().getDate() / 7),
      },
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
