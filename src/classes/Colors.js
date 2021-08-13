export class Colors {
  static primaryColor = "#023e8a";
  static backgroundColor = "rgb(242, 242, 242)";
  static headerBackgroundColor = "white";
  static textColor = "white";
  static tabBackgroundColor = "white";
  static tabInactiveColor = "gray";
  static tabActiveColor = this.primaryColor;

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

  static classColors = [
    {
      //dark red
      //primaryColor: "#9d0208",
      primaryColor: "#b13439",
    },
    {
      //default 1
      //red
      //primaryColor: "#E63946",
      primaryColor: "#eb606b",
    },
    {
      //pink
      //primaryColor: "#ff7096",
      primaryColor: "#ff8cab",
    },
    {
      //salmon
      //primaryColor: "#ffb5a7",
      primaryColor: "#ffc4b9",
    },
    {
      //dark orange
      //primaryColor: "#cc5803",
      primaryColor: "#d77935",
    },
    {
      //default 5
      //orange
      //primaryColor: "#F8961E",
      primaryColor: "#faab4b",
    },
    {
      //default 6
      //yellow
      //primaryColor: "#ffd933",
      primaryColor: "#ffe15c",
    },
    {
      //default 7
      //green
      //primaryColor: "#80b918",
      primaryColor: "#9ac746",
    },
    {
      //dark green
      //primaryColor: "#606c38",
      primaryColor: "#7f8940",
    },
    {
      //default 9
      //turquoise
      //primaryColor: "#43AA8B",
      primaryColor: "#68bba2",
    },
    {
      //default 10
      //blue
      //primaryColor: "#277DA1",
      primaryColor: "#5297b4",
    },
    {
      //dark blue
      //primaryColor: "#004e98",
      primaryColor: "#3271ad",
    },
    {
      //default 12
      //purple
      //primaryColor: "#9673A6",
      primaryColor: "#aa8fb8",
    },
    {
      //dark purple
      //primaryColor: "#6a4c93",
      primaryColor: "#8870a9",
    },
    {
      //brown
      //primaryColor: "#cb997e",
      primaryColor: "#d5ae98",
    },
    {
      //dark brown
      //primaryColor: "#734500",
      primaryColor: "#8f6a33",
    },
    {
      //gray
      //primaryColor: "#b1a7a6",
      primaryColor: "#c0b9b8",
    },
    {
      //default 17
      //black
      //primaryColor: "#23445D",
      primaryColor: "#4f697d",
    },
  ];

  static getClassColor(index) {
    return this.classColors[index].primaryColor;
  }
}
