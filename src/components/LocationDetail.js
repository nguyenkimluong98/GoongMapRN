import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback
} from "react-native";
import constant from "../config/constant";
import color from "../config/color";

export default class LocationDetail extends Component {
  state = {};
  render() {
    const { lineOne, lineTwo, onButtonClick, lineThree } = this.props;
    return (
      <View
        style={[
          styles.container,
          lineThree
            ? {
                height: constant.popupInfo - 30,
                paddingHorizontal: constant.width / 6
              }
            : { height: constant.popupInfo }
        ]}
      >
        <View style={styles.textWrapper}>
          <Text style={styles.title}>{lineOne}</Text>
          <Text style={styles.description}>{lineTwo}</Text>
        </View>
        <TouchableWithoutFeedback onPress={() => onButtonClick()}>
          <View style={styles.listOption}>
            {/* <TouchableWithoutFeedback>
            <View style={styles.listOptionItemWrapper}>
              <Image
                source={require("../assets/icons/iconFowardArrow.png")}
                style={styles.listOptionItemImage}
              />
              <Text style={styles.listOptionItemText}>Gửi vị trí</Text>
            </View>
          </TouchableWithoutFeedback> */}
            {!lineThree ? (
              <View style={styles.listOptionItemWrapper}>
                <Image
                  source={require("../assets/icons/icons8_Star_Filled_60px.png")}
                  style={[styles.listOptionItemImage, { tintColor: null }]}
                />
                <Text style={styles.listOptionItemText}>Lưu vị trí</Text>
              </View>
            ) : null}

            {/* <TouchableWithoutFeedback>
            <View style={styles.listOptionItemWrapper}>
              <Image
                source={require("../assets/icons/icons8_Place_Marker_60px_1.png")}
                style={styles.listOptionItemImage}
              />
              <Text style={styles.listOptionItemText}>Thêm vị trí</Text>
            </View>
          </TouchableWithoutFeedback> */}
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.white,

    flex: 1
  },
  textWrapper: {
    paddingLeft: 10,
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "lightgray",
    flex: 1
  },
  title: {
    fontSize: 13,
    fontWeight: "200",
    color: "black"
  },
  description: {
    fontSize: 10,
    color: "gray"
  },
  listOption: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
    height: 35
  },
  listOptionItemWrapper: {
    flexDirection: "row",
    paddingVertical: 5,
    alignItems: "center",
    flex: 1,
    justifyContent: "center"
  },
  listOptionItemImage: {
    flexDirection: "row",
    width: 15,
    height: 15,
    tintColor: color.headerBackground,
    marginRight: 5
  },
  listOptionItemText: {
    color: color.headerBackground,
    fontSize: 14,
    fontWeight: "300"
  }
});
