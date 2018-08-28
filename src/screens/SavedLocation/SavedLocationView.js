import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Alert
} from "react-native";
import color from "../../config/color";
import SwipeOut from "react-native-swipeout";
import { observer } from "../../../node_modules/mobx-react";

@observer
export default class SavedLocationView extends Component {
  state = {};

  _renderItem = (item, index) => {
    const swipeSettings = {
      autoClose: true,
      right: [
        {
          onPress: () => {
            Alert.alert(
              "Thông báo",
              `Bạn có muốn XOÁ địa điểm này không?`,
              [
                { text: "Không", onPress: null, style: "cancel" },
                {
                  text: "Có",
                  onPress: () => {
                    this.props.callBack("DELETE_SAVED_LOCATION", index);
                  }
                }
              ],
              { cancelable: true }
            );
          },
          text: "Xóa",
          type: "delete"
        }
      ],
      rowId: index,
      sectionId: 1
    };

    return (
      <SwipeOut {...swipeSettings} style={{ backgroundColor: color.white }}>
        <TouchableOpacity
          style={styles.searchItemWrapper}
          onPress={() => this.props.callBack("ANIMATE_TO_LOCATE", item)}
        >
          <Image
            source={require("../../assets/icons/icons8_Star_Filled_60px.png")}
            style={[styles.imagSearchItem]}
          />
          <View style={styles.textSearchItemWrapper}>
            <Text style={styles.textSearchItem}>
              {item.structured_formatting !== undefined
                ? item.structured_formatting.main_text
                : item.title}
            </Text>
            <Text style={styles.descript}>
              {item.structured_formatting !== undefined
                ? item.structured_formatting.secondary_text
                : item.address}
            </Text>
          </View>
        </TouchableOpacity>
      </SwipeOut>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => this.props.callBack("BACK")}>
            <Image
              source={require("../../assets/icons/iconBack.png")}
              style={{ width: 15, height: 15, tintColor: "gray" }}
            />
          </TouchableOpacity>
          <Text style={{ fontSize: 16, color: "gray", fontWeight: "200" }}>
            Các địa điểm đã lưu
          </Text>
          <View />
        </View>
        {/* <View style={styles.contentTitleWrapper}>
          <Text style={styles.titleText}>Địa chỉ nhà và công ty</Text>
        </View>
        <View style={styles.savedWrapper}>
          <TouchableOpacity style={[styles.savedItem]}>
            <Image
              source={require("../../assets/icons/icons8_Home_60px.png")}
              style={styles.imageSavedItem}
            />
            <View
              style={[
                styles.contentSavedWrapper,
                { borderBottomWidth: 0.5, borderBottomColor: "lightgray" }
              ]}
            >
              <View style={{ marginVertical: 10 }}>
                <Text style={{ fontSize: 14, color: "gray" }}>Địa chỉ nhà</Text>
                <Text style={{ fontSize: 12, color: "rgba(0,0,0,0.2)" }}>
                  Thêm địa chỉ mới
                </Text>
              </View>
              <Image
                source={require("../../assets/icons/icons8_Menu_Vertical_60px_1.png")}
                style={styles.imageSavedItem}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.savedItem]}>
            <Image
              source={require("../../assets/icons/icons8_Business_60px.png")}
              style={styles.imageSavedItem}
            />
            <View
              style={[
                styles.contentSavedWrapper,
                { borderTopWidth: 0.5, borderTopColor: "lightgray" }
              ]}
            >
              <View style={{ marginVertical: 10 }}>
                <Text style={{ fontSize: 14, color: "gray" }}>
                  Địa chỉ nơi làm việc
                </Text>
                <Text style={{ fontSize: 12, color: "rgba(0,0,0,0.2)" }}>
                  Thêm địa chỉ mới
                </Text>
              </View>
              <Image
                source={require("../../assets/icons/icons8_Menu_Vertical_60px_1.png")}
                style={styles.imageSavedItem}
              />
            </View>
          </TouchableOpacity>
        </View> */}
        <View style={styles.contentTitleWrapper}>
          <Text style={styles.titleText}>Thông tin địa điểm</Text>
        </View>
        <View style={styles.listLocate}>
          <FlatList
            data={this.props.locationSaved}
            renderItem={({ item, index }) => this._renderItem(item, index)}
            keyExtractor={index => index + ""}
          />
        </View>
        <TouchableOpacity
          style={styles.addLocate}
          onPress={() => {
            if (this.props.locationSaved.length > 0) {
              Alert.alert(
                "Thông báo",
                `Bạn có muốn XOÁ địa điểm này không?`,
                [
                  { text: "Không", onPress: null, style: "cancel" },
                  {
                    text: "Có",
                    onPress: () => {
                      this.props.callBack("DELETE_ALL_LOCATION");
                    }
                  }
                ],
                { cancelable: true }
              );
            }
          }}
        >
          <Image
            source={require("../../assets/icons/icons8_Delete_48px.png")}
            style={{
              width: 20,
              height: 20,
              marginRight: 10
            }}
          />
          <Text style={{ fontSize: 14, color: "red", fontWeight: "bold" }}>
            Xóa tất cả địa điểm
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.whileHolder,
    flex: 1
  },
  header: {
    flexDirection: "row",
    backgroundColor: color.white,
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 15,
    paddingBottom: 5,
    marginBottom: 10,
    paddingHorizontal: 10
  },
  contentTitleWrapper: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    backgroundColor: color.white,
    borderBottomWidth: 1,
    borderBottomColor: "lightgray"
  },
  titleText: {
    fontSize: 13,
    color: "gray"
  },
  savedWrapper: {
    backgroundColor: color.white,
    paddingVertical: 5,
    marginBottom: 15
  },
  savedItem: {
    flexDirection: "row",
    alignItems: "center"
  },
  imageSavedItem: {
    width: 20,
    height: 20,
    tintColor: "gray",
    marginHorizontal: 15
  },
  contentSavedWrapper: {
    justifyContent: "space-between",
    flexDirection: "row",
    flex: 1,
    alignItems: "center"
  },
  listLocate: {
    flex: 1,
    backgroundColor: color.white
  },
  addLocate: {
    flexDirection: "row",
    paddingVertical: 10,
    marginVertical: 15,
    backgroundColor: color.white,
    alignItems: "center",
    justifyContent: "center"
  },
  imagSearchItem: {
    width: 15,
    height: 15,
    margin: 10,
    marginTop: 15
  },
  textSearchItemWrapper: {
    justifyContent: "center",
    borderBottomWidth: 0.5,
    borderBottomColor: "rgba(0,0,0,0.1)",
    flex: 1,
    paddingVertical: 10
  },
  textSearchItem: {
    fontSize: 13,
    color: color.black,
    fontWeight: "300"
  },
  descript: {
    fontSize: 11,
    color: "gray"
  },
  searchItemWrapper: {
    flexDirection: "row",
    paddingRight: 10
  }
});
