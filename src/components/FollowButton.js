import React, { Component } from "react";
import { View, TouchableOpacity, Image, StyleSheet, Text } from "react-native";

import color from "../config/color";

export default class FollowButton extends Component {
  render() {
    const { onButtonClick } = this.props;
    return (
      <TouchableOpacity style={styles.container} onPress={onButtonClick}>
        <Image
          source={require("../assets/icons/iconFollow.png")}
          style={styles.imageStyle}
        />
        <Text style={styles.textStyle}>Chỉ đường</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: 120,
    height: 40,
    borderRadius: 20,
    backgroundColor: color.headerBackground,
    justifyContent: "center",
    alignItems: "center"
  },
  imageStyle: {
    width: 20,
    height: 20,
    position: "relative",
    right: 5
  },
  textStyle: { fontSize: 16, color: "white", fontWeight: "500" }
});
