import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity
} from "react-native";
import color from "../../config/color";
import constant from "../../config/constant";
import { observer } from "../../../node_modules/mobx-react";

@observer
export default class AccountView extends Component {
  state = {};
  render() {
    const { userInfo, store } = this.props;
    return (
      <View style={styles.container}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 20
          }}
        >
          <Text style={{ color: color.black, fontWeight: "500", fontSize: 18 }}>
            Thông tin cá nhân
          </Text>
        </View>
        <View style={styles.header}>
          <Image
            style={styles.avtImage}
            source={
              store.isLogining ? { uri: userInfo.picture.data.url } : null
              //require("../../assets/icons/iconMap.png")
            }
          />
          {/* <Text>{store.isLogining ? store.userInfo.email : "haha"}</Text> */}
          <View
            style={{
              marginLeft: 10,
              justifyContent: "center"
            }}
          >
            <Text
              style={{ color: color.black, fontSize: 16, fontWeight: "300" }}
            >
              {store.isLogining ? userInfo.name : null}
            </Text>
            <Text style={{ color: "gray", fontSize: 10, fontWeight: "100" }}>
              {store.isLogining ? userInfo.email : null}
            </Text>
          </View>
        </View>
        <View
          style={{ borderColor: "gray", borderWidth: 0.5, marginBottom: 50 }}
        />
        <TouchableWithoutFeedback
          onPress={() => this.props.callBack("GO_TO_SAVED_LOCATION")}
        >
          <View style={styles.button}>
            <Image
              source={require("../../assets/icons/icons8_Star_Filled_60px.png")}
              style={styles.buttonImage}
            />
            <Text style={styles.buttonText}>Địa điểm đã lưu</Text>
          </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback>
          <View style={styles.button}>
            <Image
              source={require("../../assets/icons/icons8_SMS_48px.png")}
              style={styles.buttonImage}
            />
            <Text style={styles.buttonText}>Đánh giá ứng dụng</Text>
          </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback>
          <View style={[styles.button, { marginBottom: 50 }]}>
            <Image
              source={require("../../assets/icons/icons8_Share_48px.png")}
              style={styles.buttonImage}
            />
            <Text style={styles.buttonText}>Chia sẻ Facebook</Text>
          </View>
        </TouchableWithoutFeedback>
        <View
          style={{ borderColor: "gray", borderWidth: 0.5, marginBottom: 50 }}
        />

        <TouchableOpacity
          onPress={() => this.props.callBack("LOG_OUT")}
          style={[
            styles.button,
            {
              position: "absolute",
              bottom: 20,
              left: 10,
              right: 10,
              alignItems: "center",
              justifyContent: "center"
            }
          ]}
        >
          <Text
            style={[styles.buttonText, { color: "black", fontWeight: "300" }]}
          >
            Đăng xuất
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.backgroundHolder,
    width: (constant.width * 3) / 4,
    paddingHorizontal: 10,
    paddingTop: 20
  },
  avtImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "white"
  },
  header: {
    flexDirection: "row",
    marginBottom: 20
  },
  button: {
    flexDirection: "row",
    height: 40,
    marginBottom: 20,
    borderRadius: 20,
    backgroundColor: color.white,
    alignItems: "center",
    paddingHorizontal: 20
  },
  buttonImage: {
    width: 20,
    height: 20,
    marginRight: 10
  },
  buttonText: {}
});
