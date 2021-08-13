import { Note } from "./Note";

export class WrittenNote extends Note {
  constructor(id, schoolClass, title, content) {
    super(id, schoolClass);
    this.title = title;
    this.content = content;
  }

  changeText(title, content) {
    this.title = title;
    this.content = content;
  }

  toString() {
    return (
      '{"id":"' +
      this.id +
      '","schoolClass":"' +
      this.schoolClass +
      '","title":"' +
      this.title +
      '","content":"' +
      this.content +
      '"}'
    );
  }
}
