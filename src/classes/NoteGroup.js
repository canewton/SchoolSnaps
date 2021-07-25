import { Note } from "./Note";

export class NoteGroup extends Note {
  constructor(schoolClass, notes) {
    super(schoolClass);
    this.notes = notes;
  }

  toString() {
    return (
      '{"id":"' +
      this.id +
      '","schoolClass":"' +
      this.schoolClass +
      '","notes":"' +
      this.notes +
      '"}'
    );
  }
}
