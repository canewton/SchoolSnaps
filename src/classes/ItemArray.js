export class ItemArray {
  static filter(array, property, value) {
    return array.filter((item) => {
      return item[property] === value;
    });
  }

  static find(array, property, value) {
    return property !== ""
      ? array.find((item) => item[property] === value) === value
      : array.find((item) => item === value) === value;
  }

  static remove(arrayInput, item) {
    var array = [...arrayInput];
    const index = array.indexOf(item);
    if (index > -1) {
      array.splice(index, 1);
    }
    return array;
  }

  static generateUniqueID() {
    return Date.now();
  }
}
