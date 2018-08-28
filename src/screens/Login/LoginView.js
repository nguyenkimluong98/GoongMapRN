import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert
} from "react-native";
import { observer } from "../../../node_modules/mobx-react";

@observer
class LoginView extends Component {
  render() {
    if (this.props.store.isLogining) {
      Alert.alert(
        "Login Noification",
        "Login was successful!",
        [
          {
            text: "Cancel",
            style: "cancel"
          },
          {
            text: "OK",
            onPress: () => this.props.callBack()
          }
        ],
        { cancelable: false }
      );
    }
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => this.props.callBack()}>
            <Image
              source={require("../../assets/icons/iconBack.png")}
              style={styles.headerImage}
            />
          </TouchableOpacity>
          <Text style={styles.textHeader}>ĐĂNG NHẬP</Text>
          <View />
        </View>
        <View style={styles.iconLoginWrapper}>
          <Image
            source={require("../../assets/images/imgMap.png")}
            style={styles.iconLogin}
          />
          <Text style={styles.textIconLogin}>GOONG</Text>
        </View>
        <View style={styles.loginButtonWrapper}>
          {/* <TouchableOpacity style={styles.buttonLogin}>
            <Image
              source={require("../../assets/icons/iconGoogle.png")}
              style={styles.iconLoginButton}
            />
            <Text>Đăng nhập bằng Google+</Text>
            <View />
          </TouchableOpacity> */}
          <TouchableOpacity
            style={styles.buttonLogin}
            onPress={() => this.props.callBack("LOGIN_WITH_FACEBOOK")}
          >
            <Image
              source={require("../../assets/icons/iconFacebook.png")}
              style={styles.iconLoginButton}
            />
            <Text>Đăng nhập bằng Facebook</Text>
            <View />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default LoginView;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: "lightblue",
    padding: 20
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  headerImage: {
    width: 20,
    height: 20
    // position: "absolute",
    // left: 5
  },
  textHeader: {
    fontSize: 20,
    color: "white",
    fontWeight: "300"
  },
  iconLoginWrapper: {
    marginTop: 100,
    justifyContent: "space-between",
    alignItems: "center"
  },
  iconLogin: {
    width: 80,
    height: 80
  },
  textIconLogin: {
    fontSize: 18,
    fontWeight: "100",
    color: "rgba(255,255,255,0.9)",
    marginTop: 10
  },
  loginButtonWrapper: {
    marginTop: 30,
    paddingHorizontal: 40
  },
  buttonLogin: {
    marginTop: 20,
    height: 40,
    borderRadius: 20,
    backgroundColor: "white",
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row"
  },
  iconLoginButton: {
    width: 30,
    height: 30
  }
});
