import React, { Component } from "react";
import PropTypes from "prop-types";
import { TouchableOpacity, Image, StyleSheet } from "react-native";

class SquareButton extends Component {
  state = {};

  render() {
    const { imageSource, onButtonClick } = this.props;
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => onButtonClick()}
      >
        <Image style={styles.image} source={imageSource} />
      </TouchableOpacity>
    );
  }
}

SquareButton.propTypes = {
  imageSource: PropTypes.number,
  onButtonClick: PropTypes.func
};

export default SquareButton;

const styles = StyleSheet.create({
  container: {
    width: 30,
    height: 30,
    borderRadius: 5,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center"
  },
  image: {
    width: 20,
    height: 20
  }
});
