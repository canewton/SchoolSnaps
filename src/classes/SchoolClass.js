export class SchoolClass {
  constructor(id, name, primaryColor, iconName) {
    this.id = id;
    this.name = name;
    this.primaryColor = primaryColor;
    this.iconName = iconName;
    this.status = "Current"; //status can equal "current" or "completed"
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
      '","status":"' +
      this.status +
      '"}'
    );
  }

  setStatus(status) {
    this.status = status;
  }
}
