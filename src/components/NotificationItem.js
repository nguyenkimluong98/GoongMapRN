import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableWithoutFeedback
} from "react-native";

const imageArray = [
  require("../assets/icons/iconLoginItem.png"),
  require("../assets/icons/iconDanhGia.png"),
  require("../assets/icons/iconFacebook.png"),
  require("../assets/icons/iconDonate.png")
];

class NotificationItem extends Component {
  render() {
    const {
      backgroundColor,
      lineText1,
      lineText2,
      title,
      sourceImage,
      onPressed
    } = this.props;
    const sizeImageStyle = !backgroundColor ? { width: 40, height: 40 } : null;
    return (
      <TouchableWithoutFeedback onPress={onPressed}>
        <View style={styles.container}>
          <View style={[styles.imageWrapper, { backgroundColor }]}>
            <Image
              source={imageArray[sourceImage]}
              style={[styles.image, sizeImageStyle]}
            />
          </View>
          <View style={styles.content}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.textContent}>{lineText1}</Text>
            <Text style={styles.textContent}>{lineText2 || null}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default NotificationItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
    flexDirection: "row",
    alignItems: "center"
  },
  content: {
    flex: 1
  },
  image: {
    width: 15,
    height: 15
  },
  imageWrapper: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    marginRight: 10
  },
  title: {
    fontSize: 14,
    color: "rgba(0,0,0,0.6)"
  },
  textContent: {
    fontSize: 12,
    color: "rgba(0,0,0,0.3)"
  }
});
