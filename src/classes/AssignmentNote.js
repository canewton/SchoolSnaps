import { Note } from "./Note";

export class AssignmentNote extends Note {
  constructor(schoolClass, title, iconName, attachedNotes) {
    super(schoolClass);
    this.title = title;
    this.completed = false;
    this.attachedNotes = attachedNotes;
  }

  toggleCompleted() {
    this.completed = !this.completed;
  }
}
