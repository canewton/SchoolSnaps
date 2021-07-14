import React from "react";
import { AntDesign } from "@expo/vector-icons";

export class IconsList {
  static findIcon(name, iconSize, iconColor) {
    console.log("find icon");
    const iconToReturn = this.iconList(iconSize, iconColor).find(
      (icon) => icon.title === name
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
