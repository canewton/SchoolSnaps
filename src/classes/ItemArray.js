export class ItemArray {
  static filter(array, property, value) {
    return array.filter((item) => {
      return item[property] === value;
    });
  }

  static generateUniqueID() {
    return Date.now();
  }
}
