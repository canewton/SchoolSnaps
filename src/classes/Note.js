export class Note {
  constructor(schoolClass) {
    this.id = Date.now();
    this.schoolClass = schoolClass;
  }

  toString() {
    return '{"id":"' + this.id + '","schoolClass":"' + this.schoolClass + '"}';
  }
}
