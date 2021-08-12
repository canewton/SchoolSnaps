import { Note } from "./Note";

export class Assignment extends Note {
  constructor(schoolClass, title, iconName, date, attachedNotes) {
    super(schoolClass);
    this.date = date;
    this.title = title;
    this.iconName = iconName;
    this.completed = false;
    this.attachedNotes = attachedNotes;
  }

  toggleCompleted() {
    this.completed = !this.completed;
  }
}
