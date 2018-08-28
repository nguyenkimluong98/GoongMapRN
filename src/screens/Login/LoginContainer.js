import React, { Component } from "react";
import { Alert, AsyncStorage } from "react-native";
import LoginView from "./LoginView";
import Config from "../../config/env";
import FBSDK, { LoginManager, AccessToken } from "react-native-fbsdk";
import { observer, inject } from "../../../node_modules/mobx-react";

@inject("store")
@observer
class LoginScreen extends Component {
  constructor(props) {
    super(props);
  }
  static navigationOptions = {
    header: null
  };

  closeComponent = () => {
    this.props.navigation.pop();
  };

  _changeLoginValue = value => {
    this.props.store.changeLoginValue(true, value);
    //console.warn("d m");
  };

  _storeAccessToken = async token => {
    try {
      await AsyncStorage.setItem(Config.asyncStorage.accessToken, token);
    } catch (error) {
      // Error saving data
    }
  };

  callBack = (key, data) => {
    const { store } = this.props;
    switch (key) {
      case "LOGIN_WITH_FACEBOOK":
        LoginManager.logInWithReadPermissions(["public_profile, email"])
          .then(
            result => {
              if (result.isCancelle) alert("Login was cancelled!");
              else {
                // notify login successfully

                AccessToken.getCurrentAccessToken()
                  .then(data => {
                    // store data
                    this._storeAccessToken(data.accessToken.toString());

                    // return user infomation
                    fetch(
                      "https://graph.facebook.com/v3.1/me?fields=id, email, picture, name&access_token=" +
                        data.accessToken
                    )
                      .then(response => response.json())
                      .then(json => {
                        //alert(JSON.stringify(json));
                        this._changeLoginValue(json);
                      });
                  })
                  .catch(() => {
                    alert("ERROR GETTING DATA FROM FACEBOOK");
                  });
              }
            },
            function(error) {
              alert("Login failed with error: " + error);
            }
          )
          .catch(err => alert("ERROR: " + err));
        break;
      default:
        this.props.navigation.goBack();
    }
  };

  render() {
    return <LoginView callBack={this.callBack} {...this.props} />;
  }
}

export default LoginScreen;
