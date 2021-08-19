import { ItemContext } from "./ItemContext";
import { Colors } from "../classes/Colors";
import { SchoolClass } from "../classes/SchoolClass";
import createDataContext from "./createDataContext";

class ClassesContext extends ItemContext {
  static classes = [
    new SchoolClass(1, "English", Colors.getClassColor(0), "book", "Current"),
    new SchoolClass(2, "Government", Colors.getClassColor(1), "scroll", "Current"),
    new SchoolClass(3, "Calculus", Colors.getClassColor(2), "md-calculator", "Current"),
    new SchoolClass(4, "Computer Science", Colors.getClassColor(4), "monitor", "Current"),
    new SchoolClass(
      5,
      "Graphic Design",
      Colors.getClassColor(6),
      "paint-brush",
      "Current"
    ),
    new SchoolClass(
      6,
      "Physical Education",
      Colors.getClassColor(7),
      "running",
      "Current"
    ),
    new SchoolClass(7, "Physics", Colors.getClassColor(8), "satellite", "Current"),
    new SchoolClass(8, "Statistics", Colors.getClassColor(9), "graph-pie", "Current"),
  ];
}

export const { Context, Provider } = createDataContext(
  ClassesContext.reducer,
  {
    add: ClassesContext.add,
    edit: ClassesContext.edit,
    delete: ClassesContext.delete,
  },
  ClassesContext.classes
);
