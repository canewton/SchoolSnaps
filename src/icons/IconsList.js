import React from "react";
import { AntDesign } from "@expo/vector-icons";

export class IconsList {
  //Find the icon with the inputted name. Return a question mark icon if
  //the icon name inputted is not found
  static findIcon(name, iconSize, iconColor) {
    const iconToReturn = this.iconList(iconSize, iconColor).find(
      (icon) => icon.name === name
    );

    return iconToReturn === undefined ? (
      <AntDesign name="questioncircleo" size={iconSize} color={iconColor} />
    ) : (
      iconToReturn.icon
    );
  }

  static iconList(iconSize, iconColor) {
    return [];
  }
}
