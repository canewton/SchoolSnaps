import { ItemContext } from "./ItemContext";
import { Colors } from "../classes/Colors";
import { SchoolClass } from "../classes/SchoolClass";
import createDataContext from "./createDataContext";

class ClassesContext extends ItemContext {
  static classes = [
    new SchoolClass(1, "English", Colors.getClassColor(1), "book"),
    new SchoolClass(2, "Government", Colors.getClassColor(5), "scroll"),
    new SchoolClass(3, "Calculus", Colors.getClassColor(6), "md-calculator"),
    new SchoolClass(4, "Computer Science", Colors.getClassColor(7), "monitor"),
    new SchoolClass(5, "Graphic Design", Colors.getClassColor(9), "paint-brush"),
    new SchoolClass(6, "Physical Education", Colors.getClassColor(10), "running"),
    new SchoolClass(7, "Physics", Colors.getClassColor(12), "satellite"),
    new SchoolClass(8, "Statistics", Colors.getClassColor(17), "graph-pie"),
  ];
}

export const { Context, Provider } = createDataContext(
  ClassesContext.reducer,
  {
    add: ClassesContext.add,
    replace: ClassesContext.replace,
    delete: ClassesContext.delete,
    filter: ClassesContext.filter,
  },
  ClassesContext.classes
);
