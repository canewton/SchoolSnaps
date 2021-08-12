export class Assignment {
  constructor(id, schoolClass, title, iconName, date, attachedNotes) {
    this.id = id;
    this.schoolClass = schoolClass;
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
