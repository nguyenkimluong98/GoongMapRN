import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  FlatList
} from "react-native";
import color from "../../config/color";
import { observer } from "../../../node_modules/mobx-react";

@observer
export default class FindRoadView extends Component {
  state = {};
  render() {
    const { arival, departure } = this.props;
    const Arival = (
      <View style={styles.departure}>
        <Image
          source={require("../../assets/icons/iconPlusRound.png")}
          style={[styles.imgHeader, { tintColor: color.headerBackground }]}
        />
      </View>
    );

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={[styles.departure, { justifyContent: "space-between" }]}>
            <TouchableOpacity onPress={() => this.props.callBack("BACK")}>
              <Image
                source={require("../../assets/icons/iconBack.png")}
                style={styles.imgHeader}
              />
            </TouchableOpacity>
            <Text
              style={{ fontSize: 16, fontWeight: "500", color: color.white }}
            >
              Tìm kiếm đường đi
            </Text>
            <View />
          </View>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            backgroundColor: color.headerBackground,
            marginVertical: 15,
            borderBottomWidth: 1,
            borderBottomColor: "white",
            borderTopWidth: 1,
            borderTopColor: "white",
            paddingHorizontal: 20
          }}
        >
          <Text style={{ fontSize: 14, color: "white", fontWeight: "300" }}>
            Chọn địa điểm khởi hành:
          </Text>
          <TouchableWithoutFeedback
            onPress={() => {
              this.props.callBack("TO_SEARCH_LOCATION", "DEPARTURE");
            }}
          >
            <View style={styles.contentRowHeader}>
              <Text style={styles.textTitle}>{`Từ   :`}</Text>
              <Text style={styles.textContent}>
                {departure !== null
                  ? departure.structured_formatting.main_text
                  : "Chọn vị trí đi"}
              </Text>
            </View>
          </TouchableWithoutFeedback>

          <Text
            style={{
              fontSize: 14,
              color: "white",
              fontWeight: "300",
              marginTop: 10
            }}
          >
            Chọn địa điểm kết thúc:
          </Text>
          <TouchableWithoutFeedback
            onPress={() => {
              this.props.callBack("TO_SEARCH_LOCATION", "ARIVAL");
            }}
          >
            <View style={styles.contentRowHeader}>
              <Text style={styles.textTitle}>Tới :</Text>
              <Text style={styles.textContent}>
                {arival !== null
                  ? arival.structured_formatting.main_text
                  : "Chọn vị trí đến"}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>

        <TouchableWithoutFeedback
          onPress={() => this.props.callBack("SET_FROM_TO")}
        >
          <View
            style={{
              margin: 10,
              height: 30,
              borderRadius: 15,
              backgroundColor: color.white,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Text
              style={{
                fontSize: 14,
                color: color.headerBackground,
                fontWeight: "300"
              }}
            >
              Tìm đường
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: color.headerBackground,
    flex: 1
  },
  header: {
    paddingTop: 15
  },
  departure: {
    flexDirection: "row",
    paddingHorizontal: 15,
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10
  },
  imgHeader: {
    width: 20,
    height: 20
  },
  contentRowHeader: {
    flexDirection: "row",
    backgroundColor: color.backgroundHolder,
    marginLeft: 10,
    height: 30,
    borderRadius: 15,
    paddingHorizontal: 5,
    alignItems: "center",
    marginVertical: 15
  },
  textTitle: {
    fontSize: 12,
    color: color.textHolder,
    marginRight: 10
  },
  textContent: {
    fontSize: 14,
    color: color.white
  },
  contentView: {
    flex: 1
  },
  addAdress: {
    flexDirection: "row",
    paddingVertical: 10,
    backgroundColor: color.white,
    justifyContent: "space-around",
    marginBottom: 10
  },
  itemAdress: {},
  textTitleAdress: {
    color: color.black,
    fontSize: 12
  },
  textDescript: {
    fontSize: 10,
    color: "rgba(0,0,0,0.6)"
  },
  deleteHistory: {
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    flex: 0.1,
    backgroundColor: color.white
  }
});
