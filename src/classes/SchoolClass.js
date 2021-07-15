export class SchoolClass {
  constructor(id, name, primaryColor, iconName) {
    this.id = id;
    this.name = name;
    this.primaryColor = primaryColor;
    this.iconName = iconName;
    this.active = false;
  }

  toString() {
    return (
      '{"id":"' +
      this.id +
      '","name":"' +
      this.name +
      '","primaryColor":"' +
      this.primaryColor +
      '","iconName":"' +
      this.iconName +
      '"}'
    );
  }
}
