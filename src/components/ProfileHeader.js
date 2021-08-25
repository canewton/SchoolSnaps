import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Styles from "../classes/Styles";
import { GeneralIcons } from "../icons/GeneralIcons";

const ProfileHeader = ({ textColor }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        marginLeft: 25,
        alignItems: "center",
        height: Styles.profileHeaderHeight,
      }}
    >
      {GeneralIcons.findIcon("Profile", 80, textColor)}
      <View style={{ marginLeft: 10 }}>
        <Text
          style={{ color: textColor, fontSize: 24, fontWeight: "bold", marginBottom: 4 }}
        >
          Caden Newton
        </Text>
        <Text style={{ color: textColor, fontSize: 14, fontWeight: "300" }}>
          cnewt2003@gmail.com
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default ProfileHeader;
