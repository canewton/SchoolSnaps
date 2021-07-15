export class Note {
  constructor(id, schoolClass, content) {
    this.id = id;
    this.schoolClass = schoolClass;
    this.content = content;
  }

  toString() {
    return (
      '{"id":"' +
      this.id +
      '","schoolClass":"' +
      this.schoolClass +
      '","content":"' +
      this.content +
      '"}'
    );
  }
}
