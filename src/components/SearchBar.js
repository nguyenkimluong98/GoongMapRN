import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback
} from "react-native";

import color from "../config/color";

const { width } = Dimensions.get("window");

class SearchBar extends Component {
  render() {
    const { store } = this.props;
    return (
      <View style={[styles.container]}>
        <View style={styles.wrapperHeader}>
          <TouchableOpacity onPress={() => this.props.onClick()}>
            <Image
              source={
                store.isLogining
                  ? { uri: store.userInfo.picture.data.url }
                  : // require("../assets/icons/icons8_Checked_User_Male_48px.png")
                    require("../assets/icons/iconUser.png")
              }
              style={[styles.headerImage, { marginLeft: 15 }]}
            />
          </TouchableOpacity>
          <TouchableWithoutFeedback onPress={this.props.onSearchClick}>
            <View style={styles.header}>
              <Image
                source={require("../assets/icons/iconSearch.png")}
                style={[
                  styles.headerImage,
                  { marginLeft: 10, tintColor: "white" }
                ]}
              />
              {/* <TextInput
              style={{
                flex: 1,
                fontSize: 14,
                paddingVertical: 5,
                color: "white"
              }}
              placeholder="Search adress"
              placeholderTextColor="white"
              underlineColorAndroid="transparent"
              autoCorrect={false}
              onSubmitEditing={Keyboard.dismiss}
            /> */}
              <Text
                style={{
                  flex: 1,
                  fontSize: 14,
                  paddingVertical: 5,
                  color: color.textHolder
                }}
              >
                Search adress
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }
}

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "flex-start"
  },
  wrapperHeader: {
    height: 60,
    flexDirection: "row",
    backgroundColor: color.headerBackground,
    alignItems: "center"
  },
  header: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: color.backgroundHolder,
    height: 30,
    borderRadius: 15,
    margin: 10
  },
  headerImage: {
    padding: 10,
    margin: 5,
    height: 20,
    width: 20,
    resizeMode: "stretch",
    alignItems: "center",
    borderRadius: 10
  },
  itemsImage: {
    width: width / 3 - 3,
    height: width / 3 - 3,
    margin: 1,
    borderWidth: 1,
    borderColor: "white"
  }
});
