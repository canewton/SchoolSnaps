import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { IconsList } from "./IconsList";

export class ClassIcons extends IconsList {
  static iconList(iconSize, iconColor) {
    return [
      {
        icon: <FontAwesome5 name="book" size={iconSize} color={iconColor} />,
        name: "book",
      },
      {
        icon: <FontAwesome5 name="scroll" size={iconSize} color={iconColor} />,
        name: "scroll",
      },
      {
        icon: <Ionicons name="md-calculator" size={iconSize} color={iconColor} />,
        name: "md-calculator",
      },
      {
        icon: <Feather name="monitor" size={iconSize} color={iconColor} />,
        name: "monitor",
      },
      {
        icon: <FontAwesome name="paint-brush" size={iconSize} color={iconColor} />,
        name: "paint-brush",
      },
      {
        icon: <FontAwesome5 name="running" size={iconSize} color={iconColor} />,
        name: "running",
      },
      {
        icon: <FontAwesome5 name="satellite" size={iconSize} color={iconColor} />,
        name: "satellite",
      },
      {
        icon: <Foundation name="graph-pie" size={iconSize} color={iconColor} />,
        name: "graph-pie",
      },
      {
        icon: <FontAwesome5 name="dna" size={iconSize - 2} color={iconColor} />,
        name: "dna",
      },
      {
        icon: <FontAwesome5 name="atom" size={iconSize} color={iconColor} />,
        name: "atom",
      },
      {
        icon: <Entypo name="code" size={iconSize} color={iconColor} />,
        name: "code",
      },
      {
        icon: <Ionicons name="earth-sharp" size={iconSize} color={iconColor} />,
        name: "earth-sharp",
      },
      {
        icon: <AntDesign name="heart" size={iconSize} color={iconColor} />,
        name: "heart",
      },
      {
        icon: <FontAwesome name="gear" size={iconSize} color={iconColor} />,
        name: "gear",
      },
      {
        icon: <FontAwesome5 name="history" size={iconSize} color={iconColor} />,
        name: "history",
      },
      {
        icon: <Ionicons name="musical-notes" size={iconSize + 2} color={iconColor} />,
        name: "musical-notes",
      },
      {
        icon: (
          <MaterialIcons name="local-fire-department" size={iconSize} color={iconColor} />
        ),
        name: "local-fire-department",
      },
      {
        icon: <FontAwesome5 name="leaf" size={iconSize - 3} color={iconColor} />,
        name: "leaf",
      },
      {
        icon: <MaterialIcons name="camera-alt" size={iconSize} color={iconColor} />,
        name: "camera-alt",
      },
      {
        icon: (
          <MaterialCommunityIcons name="head-cog" size={iconSize + 4} color={iconColor} />
        ),
        name: "head-cog",
      },
      {
        icon: <MaterialIcons name="message" size={iconSize} color={iconColor} />,
        name: "message",
      },
      {
        icon: <FontAwesome5 name="theater-masks" size={iconSize} color={iconColor} />,
        name: "theater-masks",
      },
      {
        icon: (
          <MaterialCommunityIcons name="elephant" size={iconSize} color={iconColor} />
        ),
        name: "elephant",
      },
      {
        icon: <Fontisto name="test-tube" size={iconSize} color={iconColor} />,
        name: "test-tube",
      },
    ];
  }
}
