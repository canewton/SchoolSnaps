import { Note } from "./Note";

export class NoteGroup extends Note {
  constructor(id, schoolClass, notes) {
    super(id, schoolClass);
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
