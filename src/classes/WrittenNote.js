import { Note } from "./Note";

export class WrittenNote extends Note {
  constructor(schoolClass, title, content) {
    super(schoolClass);
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
