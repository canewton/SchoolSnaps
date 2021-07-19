export class Note {
  constructor(id, schoolClass, content) {
    this.id = id;
    this.schoolClass = schoolClass;
  }

  toString() {
    return '{"id":"' + this.id + '","schoolClass":"' + this.schoolClass + '"}';
  }
}
