import React, { Component } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import color from "../../config/color";

export default class SplashView extends Component {
  state = {};

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require("../../assets/icons/icons8_Globe_96px.png")}
          style={{ width: 80, height: 80, marginBottom: 20 }}
        />
        <Text style={{ color: color.white, fontSize: 18, fontWeight: "bold" }}>
          Awsome Map
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.backgroundHolder,
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  }
});
