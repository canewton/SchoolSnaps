export class ObjectArray {
  static filter(array, property, value) {
    return array.filter((item) => {
      return item[property] === value;
    });
  }
}
