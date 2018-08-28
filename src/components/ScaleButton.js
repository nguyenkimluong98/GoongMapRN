import React, { Component } from "react";
import { View, TouchableOpacity, Image, StyleSheet, Text } from "react-native";

const valueScale = 2;

export default class ScaleButton extends Component {
  render() {
    const { onButtonClick } = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.wrapper}
          onPress={() => onButtonClick(1 / valueScale)}
        >
          <Image
            source={require("../assets/icons/iconPlus.png")}
            style={styles.imageStyle}
          />
        </TouchableOpacity>
        <View
          style={{
            borderWidth: 0.5,
            borderColor: "#DDDDDD",
            marginHorizontal: 5,
            justifyContent: "center"
          }}
        />
        <TouchableOpacity
          style={styles.wrapper}
          onPress={() => onButtonClick(valueScale)}
        >
          <Image
            source={require("../assets/icons/iconMinus.png")}
            style={styles.imageStyle}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: 30,
    height: 80,
    borderColor: "black",
    borderRadius: 10,
    backgroundColor: "white"
  },
  imageStyle: {
    width: 20,
    height: 20
  },
  wrapper: {
    flex: 9,
    justifyContent: "center",
    alignItems: "center"
  }
});
