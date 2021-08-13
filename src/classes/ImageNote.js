import { Note } from "./Note";

export class ImageNote extends Note {
  constructor(id, schoolClass, uri) {
    super(id, schoolClass);
    this.uri = uri;
  }

  toString() {
    return (
      '{"id":"' +
      this.id +
      '","schoolClass":"' +
      this.schoolClass +
      '","uri":"' +
      this.uri +
      '"}'
    );
  }
}
