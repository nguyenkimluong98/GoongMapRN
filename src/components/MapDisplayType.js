import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image
} from "react-native";

const { width } = Dimensions.get("window");

class MapDisplayType extends Component {
  state = {};

  render() {
    const { img, title, type } = this.props.item;
    const { clicked } = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={[styles.contentWrapper]}
          onPress={() => clicked(type)}
        >
          <Image style={styles.mainImage} source={img} />
        </TouchableOpacity>
        <Text style={styles.textTitle}>{title}</Text>
      </View>
    );
  }
}

MapDisplayType.propTypes = {
  title: PropTypes.string
};

export default MapDisplayType;

const styles = StyleSheet.create({
  container: {
    alignItems: "center"
  },
  contentWrapper: {
    width: 0.3 * width,
    height: 0.3 * 0.75 * width
  },
  mainImage: {
    width: 0.3 * width,
    height: 0.3 * 0.75 * width,
    borderRadius: 10
  },
  textTitle: {
    fontSize: 16,
    color: "gray",
    marginTop: 5
  }
});
