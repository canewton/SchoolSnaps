export class Colors {
  static primaryColor = "#023e8a";
  static backgroundColor = "rgb(242, 242, 242)";
  static headerBackgroundColor = "white";
  static textColor = "white";
  static tabBackgroundColor = "white";
  static tabInactiveColor = "gray";
  static tabActiveColor = this.primaryColor;
  static classesColorBrightness = 10;

  static shadow = {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  };

  static changeOpacity(color, opacity) {
    return color + Math.round(opacity * 255).toString(16);
  }

  static increaseBrightness(hex, percent) {
    // strip the leading # if it's there
    hex = hex.replace(/^\s*#|\s*$/g, "");

    // convert 3 char codes --> 6, e.g. `E0F` --> `EE00FF`
    if (hex.length == 3) {
      hex = hex.replace(/(.)/g, "$1$1");
    }

    var r = parseInt(hex.substr(0, 2), 16);
    var g = parseInt(hex.substr(2, 2), 16);
    var b = parseInt(hex.substr(4, 2), 16);

    return (
      "#" +
      (0 | ((1 << 8) + r + ((256 - r) * percent) / 100)).toString(16).substr(1) +
      (0 | ((1 << 8) + g + ((256 - g) * percent) / 100)).toString(16).substr(1) +
      (0 | ((1 << 8) + b + ((256 - b) * percent) / 100)).toString(16).substr(1)
    );
  }

  static classColors = [
    {
      //dark red
      primaryColor: this.increaseBrightness("#9d0208", this.classesColorBrightness),
      //primaryColor: "#b13439",
    },
    {
      //default 1
      //red
      primaryColor: this.increaseBrightness("#E63946", this.classesColorBrightness),
    },
    {
      //pink
      primaryColor: this.increaseBrightness("#ff7096", this.classesColorBrightness),
    },
    {
      //salmon
      primaryColor: this.increaseBrightness("#ffb5a7", this.classesColorBrightness),
    },
    {
      //dark orange
      primaryColor: this.increaseBrightness("#cc5803", this.classesColorBrightness),
    },
    {
      //default 5
      //orange
      primaryColor: this.increaseBrightness("#F8961E", this.classesColorBrightness),
    },
    {
      //default 6
      //yellow
      primaryColor: this.increaseBrightness("#ffd933", this.classesColorBrightness),
    },
    {
      //default 7
      //green
      primaryColor: this.increaseBrightness("#80b918", this.classesColorBrightness),
    },
    {
      //dark green
      primaryColor: this.increaseBrightness("#606c38", this.classesColorBrightness),
    },
    {
      //default 9
      //turquoise
      primaryColor: this.increaseBrightness("#43AA8B", this.classesColorBrightness),
    },
    {
      //default 10
      //blue
      primaryColor: this.increaseBrightness("#277DA1", this.classesColorBrightness),
    },
    {
      //dark blue
      primaryColor: this.increaseBrightness("#004e98", this.classesColorBrightness),
    },
    {
      //default 12
      //purple
      primaryColor: this.increaseBrightness("#9673A6", this.classesColorBrightness),
    },
    {
      //dark purple
      primaryColor: this.increaseBrightness("#6a4c93", this.classesColorBrightness),
    },
    {
      //brown
      primaryColor: this.increaseBrightness("#cb997e", this.classesColorBrightness),
    },
    {
      //dark brown
      primaryColor: this.increaseBrightness("#734500", this.classesColorBrightness),
    },
    {
      //gray
      primaryColor: this.increaseBrightness("#b1a7a6", this.classesColorBrightness),
    },
    {
      //default 17
      //black
      primaryColor: this.increaseBrightness("#23445D", this.classesColorBrightness),
    },
  ];

  static getClassColor(index) {
    return this.classColors[index].primaryColor;
  }
}
