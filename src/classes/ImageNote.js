import { Note } from "./Note";

export class ImageNote extends Note {
  constructor(id, schoolClass, image) {
    super(id, schoolClass);
    this.image = image;
  }

  toString() {
    return (
      '{"id":"' +
      this.id +
      '","schoolClass":"' +
      this.schoolClass +
      '","image":"' +
      this.image +
      '"}'
    );
  }
}
