export class Colors {
  static primaryColor = "#023e8a";
  static backgroundColor = "rgb(238, 238, 238)";
  static headerBackgroundColor = this.primaryColor;
  static textColor = "white";
  static tabBackgroundColor = "white";
  static tabInactiveColor = "gray";
  static tabActiveColor = this.primaryColor;
  static classesColorBrightness = 10;

  static shadow = {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
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
      //red
      primaryColor: this.increaseBrightness("#E63946", this.classesColorBrightness),
    },
    {
      //dark orange
      primaryColor: this.increaseBrightness("#ff8e0f", this.classesColorBrightness),
    },
    {
      //yellow
      primaryColor: this.increaseBrightness("#e7d809", this.classesColorBrightness),
    },
    {
      //green
      primaryColor: this.increaseBrightness("#88d01a", this.classesColorBrightness),
    },
    {
      //dark green
      primaryColor: this.increaseBrightness("#2fc819", this.classesColorBrightness),
    },
    {
      //light blue
      primaryColor: this.increaseBrightness("#39e6bf", this.classesColorBrightness),
    },
    {
      //blue
      primaryColor: this.increaseBrightness("#2dafe4", this.classesColorBrightness),
    },
    {
      //dark blue
      primaryColor: this.increaseBrightness("#2560da", this.classesColorBrightness),
    },
    {
      //dark purple
      primaryColor: this.increaseBrightness("#6c39e6", this.classesColorBrightness),
    },
    {
      //purple
      primaryColor: this.increaseBrightness("#c239e6", this.classesColorBrightness),
    },
    {
      //light purple
      primaryColor: this.increaseBrightness("#e639b4", this.classesColorBrightness),
    },
    {
      //salmon
      primaryColor: this.increaseBrightness("#ffb5a7", this.classesColorBrightness),
    },
    {
      //tan
      primaryColor: this.increaseBrightness("#dda15e", this.classesColorBrightness),
    },
    {
      //dark brown
      primaryColor: this.increaseBrightness("#734500", this.classesColorBrightness),
    },
    {
      //black
      primaryColor: this.increaseBrightness("#23445D", this.classesColorBrightness),
    },
    {
      //gray
      primaryColor: this.increaseBrightness("#b1a7a6", this.classesColorBrightness),
    },
  ];

  static getClassColor(index) {
    return this.classColors[index].primaryColor;
  }
}
