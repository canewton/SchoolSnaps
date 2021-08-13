export class Assignment {
  constructor(id, schoolClass, title, iconName, date, completed, attachedNotes) {
    this.id = id;
    this.schoolClass = schoolClass;
    this.date = date;
    this.title = title;
    this.iconName = iconName;
    this.completed = completed;
    this.attachedNotes = attachedNotes;
  }

  toggleCompleted() {
    this.completed = !this.completed;
  }
}
