import React, { Component } from "react";
import { AsyncStorage, Alert } from "react-native";
import AccountView from "./AccountView";
import { LoginManager } from "react-native-fbsdk";

import Config from "../../config/env";
import { observer } from "../../../node_modules/mobx-react";

@observer
export default class AccountScreen extends Component {
  state = {};
  render() {
    return <AccountView {...this.props} callBack={this.callBack} />;
  }

  _removeToken = async () => {
    try {
      await AsyncStorage.removeItem(Config.asyncStorage.accessToken);
    } catch (error) {}
  };

  _onLogout = () => {
    LoginManager.logOut();
    this.props.store.changeLoginValue(false, {});

    // remove token from asyncstorage
    this._removeToken();
    this.props._drawerMenu.close();
  };

  callBack = (key, data) => {
    switch (key) {
      case "LOG_OUT":
        Alert.alert(
          "Logout Facebook",
          "Do you want to logout?",
          [{ text: "No" }, { text: "Yes", onPress: () => this._onLogout() }],
          { cancelable: false }
        );
        break;
      case "GO_TO_SAVED_LOCATION":
        this.props.navigation.navigate("SavedLocation");
        break;
      default:
        break;
    }
  };
}
