import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Keyboard,
  TouchableOpacity,
  Image,
  TextInput,
  TouchableWithoutFeedback,
  FlatList,
  Alert
} from "react-native";
import color from "../../config/color";
import { observer } from "mobx-react";
import SwipeOut from "react-native-swipeout";
import { observable } from "../../../node_modules/mobx";

@observer
export default class SearchLocationView extends Component {
  state = {
    text: ""
  };
  // flag = true khi co data dia diem tra ve
  _onItemClick = (flag, data) => {
    if (flag) {
      if (this.props.fromFindRoad) {
        switch (this.props.field) {
          case "ARIVAL":
            this.props.callBack("SET_DATA_FIND_ROAD", { from: null, to: data });
            this.props.callBack("BACK");
            break;
          case "DEPARTURE":
            this.props.callBack("SET_DATA_FIND_ROAD", { from: data, to: null });
            this.props.callBack("BACK");
          default:
            break;
        }
      } else this.props.callBack("ANIMATE_TO_LOCATE", data);
    } else {
      this.setState({ text: data });
      this.props.callBack("SEARCH_LOCATION", { data: data, save: false });
    }
  };

  renderItem = (item, index) => {
    const { dataPlace, searchedValue, callBack } = this.props;
    const _flag = dataPlace.length > 0 ? true : false;
    const swipeSettings = {
      autoClose: true,
      right: [
        {
          onPress: () => {
            Alert.alert(
              "Thông báo",
              `Bạn có muốn ${_flag ? "LƯU" : "XÓA"} địa điểm này không?`,
              [
                { text: "Không", onPress: null, style: "cancel" },
                {
                  text: "Có",
                  onPress: () => {
                    if (_flag) {
                      callBack("SAVED_LOCATION", item);
                    } else {
                      callBack("DELETE_ROW_SEARCHED", index);
                    }
                  }
                }
              ],
              { cancelable: true }
            );
          },
          text: _flag ? "Lưu" : "Xóa",
          type: _flag ? "primary" : "delete"
        }
      ],
      rowId: index,
      sectionId: 1
    };

    return (
      <SwipeOut {...swipeSettings} style={{ backgroundColor: color.white }}>
        <TouchableOpacity
          style={styles.searchItemWrapper}
          onPress={() => {
            this._onItemClick(_flag, item);
          }}
        >
          <Image
            source={
              dataPlace.length > 0
                ? require("../../assets/icons/icons8_Place_Marker_60px_1.png")
                : require("../../assets/icons/icons8_Time_60px.png")
            }
            style={[
              styles.imagSearchItem,
              dataPlace.length > 0 ? { marginTop: 20 } : null
            ]}
          />
          <View style={styles.textSearchItemWrapper}>
            <Text style={styles.textSearchItem}>
              {dataPlace.length > 0
                ? item.structured_formatting.main_text
                : item}
            </Text>
            <Text style={styles.descript}>
              {dataPlace.length > 0
                ? item.structured_formatting.secondary_text
                : null}
            </Text>
          </View>
        </TouchableOpacity>
      </SwipeOut>
    );
  };

  render() {
    return (
      <View style={[styles.container]}>
        <View style={styles.wrapperHeader}>
          <TouchableOpacity onPress={() => this.props.callBack("BACK")}>
            <Image
              source={require("../../assets/icons/iconBack.png")}
              style={[
                styles.headerImage,
                { marginLeft: 15, tintColor: "gray" }
              ]}
            />
          </TouchableOpacity>
          <View style={styles.header}>
            <Image
              source={require("../../assets/icons/iconSearch.png")}
              style={[
                styles.headerImage,
                { marginLeft: 10, tintColor: "gray" }
              ]}
            />
            <TextInput
              style={{
                flex: 1,
                fontSize: 14,
                paddingVertical: 5,
                color: "rgba(0,0,0,0.4)"
              }}
              placeholder="Tìm kiếm..."
              placeholderTextColor="gray"
              underlineColorAndroid={color.white}
              autoCorrect={false}
              onSubmitEditing={() => {
                Keyboard.dismiss;
                this.props.callBack("SEARCH_LOCATION", {
                  data: this.state.text,
                  save: true
                });
              }}
              onChangeText={text => this.setState({ text })}
              value={this.state.text}
            />
          </View>
        </View>

        <View style={styles.underHeader}>
          <TouchableWithoutFeedback
            onPress={() => this.props.callBack("TO_SAVED_LOCATION")}
          >
            <View style={styles.underHeaderItem}>
              <Image
                source={require("../../assets/icons/icons8_Star_Filled_60px.png")}
                style={styles.imageUnderHeaderItem}
              />
              <Text style={styles.textUnderHeaderItem}>
                Xem tất cả địa điểm đã lưu
              </Text>
            </View>
          </TouchableWithoutFeedback>
          {/* <View style={{ borderWidth: 0.5, borderColor: "rgba(0,0,0,0.1)" }} />
          <TouchableWithoutFeedback>
            <View style={styles.underHeaderItem}>
              <Image
                source={require("../../assets/icons/icons8_Place_Marker_60px.png")}
                style={styles.imageUnderHeaderItem}
              />
              <Text style={styles.textUnderHeaderItem}>Chọn trên bản đồ</Text>
            </View>
          </TouchableWithoutFeedback> */}
        </View>

        <View style={styles.content}>
          <FlatList
            extraData={this.state}
            data={
              this.props.dataPlace.length > 0
                ? this.props.dataPlace
                : this.props.searchedValue
            }
            renderItem={({ item, index }) => this.renderItem(item, index)}
            keyExtractor={index => index + ""}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(255,255,255,0.4)",
    flex: 1
  },
  wrapperHeader: {
    height: 60,
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255,0.6)",
    borderBottomWidth: 0.5,
    borderBottomColor: "rgba(0,0,0,0.1)",
    alignItems: "center",
    marginBottom: 15
  },
  header: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: color.white,
    height: 30,
    borderRadius: 15,
    margin: 10
  },
  headerImage: {
    padding: 10,
    margin: 5,
    height: 15,
    width: 15,
    resizeMode: "stretch",
    alignItems: "center",
    tintColor: "white"
  },
  underHeader: {
    flexDirection: "row",
    paddingVertical: 10,
    justifyContent: "space-around",
    backgroundColor: color.white,
    marginBottom: 10
  },
  underHeaderItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  },
  imageUnderHeaderItem: {
    width: 15,
    height: 15,
    marginRight: 5
  },
  textUnderHeaderItem: {
    fontSize: 12,
    color: color.black
  },
  content: {
    flex: 1,
    backgroundColor: color.white
  },
  searchItemWrapper: {
    flexDirection: "row",
    paddingRight: 10
  },
  imagSearchItem: {
    width: 15,
    height: 15,
    margin: 10,
    tintColor: "gray",
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
  }
});
