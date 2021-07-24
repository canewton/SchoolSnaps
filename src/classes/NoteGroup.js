import { Note } from "./Note";

export class NoteGroup extends Note {
  constructor(schoolClass, title, notes) {
    super(schoolClass);
    this.title = title;
    this.notes = notes;
  }

  toString() {
    return (
      '{"id":"' +
      this.id +
      '","schoolClass":"' +
      this.schoolClass +
      '","title":"' +
      this.title +
      '","notes":"' +
      this.notes +
      '"}'
    );
  }
}
