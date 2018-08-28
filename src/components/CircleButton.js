import React, { Component } from "react";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";

export default class CircleButton extends Component {
  render() {
    const { onButtonClick } = this.props;
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => onButtonClick()}
      >
        <Image source={this.props.icon} style={styles.imageStyle} />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center"
  },
  imageStyle: {
    width: 20,
    height: 20
  }
});
