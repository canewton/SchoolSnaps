export class Colors {
  static primaryColor = "#023e8a";
  static backgroundColor = "rgb(242, 242, 242)";
  static textColor = "white";
  static tabBackgroundColor = "white";
  static tabInactiveColor = "gray";
  static tabActiveColor = this.primaryColor;

  static classColors = [
    {
      //dark red
      primaryColor: "#9d0208",
      secondaryColor: "#9d0208",
    },
    {
      //default 1
      //red
      primaryColor: "#E63946",
      secondaryColor: "#E63946",
    },
    {
      //pink
      primaryColor: "#ff7096",
      secondaryColor: "#ff7096",
    },
    {
      //salmon
      primaryColor: "#ffb5a7",
      secondaryColor: "#ffb5a7",
    },
    {
      //dark orange
      primaryColor: "#cc5803",
      secondaryColor: "#cc5803",
    },
    {
      //default 5
      //orange
      primaryColor: "#F8961E",
      secondaryColor: "#F8961E",
    },
    {
      //default 6
      //yellow
      primaryColor: "#ffd933",
      secondaryColor: "#ffd933",
    },
    {
      //default 7
      //green
      primaryColor: "#80b918",
      secondaryColor: "#80b918",
    },
    {
      //dark green
      primaryColor: "#606c38",
      secondaryColor: "#606c38",
    },
    {
      //default 9
      //turquoise
      primaryColor: "#43AA8B",
      secondaryColor: "#43AA8B",
    },
    {
      //default 10
      //blue
      primaryColor: "#277DA1",
      secondaryColor: "#277DA1",
    },
    {
      //dark blue
      primaryColor: "#004e98",
      secondaryColor: "#004e98",
    },
    {
      //default 12
      //purple
      primaryColor: "#9673A6",
      secondaryColor: "#9673A6",
    },
    {
      //dark purple
      primaryColor: "#6a4c93",
      secondaryColor: "#6a4c93",
    },
    {
      //brown
      primaryColor: "#cb997e",
      secondaryColor: "#cb997e",
    },
    {
      //dark brown
      primaryColor: "#734500",
      secondaryColor: "#734500",
    },
    {
      //gray
      primaryColor: "#b1a7a6",
      secondaryColor: "#b1a7a6",
    },
    {
      //default 17
      //black
      primaryColor: "#23445D",
      secondaryColor: "#23445D",
    },
  ];

  static getClassColor(index) {
    return this.classColors[index].primaryColor;
  }
}
