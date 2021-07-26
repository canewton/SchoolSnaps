export class ItemArray {
  static filter(array, property, value) {
    return array.filter((item) => {
      return item[property] === value;
    });
  }

  static find(array, property, value) {
    return property !== ""
      ? array.find((item) => item[property] === value)
      : array.find((item) => item === value);
  }

  static replace(arrayInput, itemID, item) {
    var array = [...arrayInput];
    var index = arrayInput.map((item) => item.id).indexOf(itemID);
    array[index] = item;
    return array;
  }

  static remove(arrayInput, itemID) {
    return arrayInput.filter((item) => item.id !== itemID);
  }

  static generateUniqueID() {
    return Date.now();
  }
}
