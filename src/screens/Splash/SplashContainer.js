import React, { Component } from "react";
import { AsyncStorage } from "react-native";
import SplashView from "./SplashView";
import * as FacebookAPI from "../../api/FacebookAPI";
import Config from "../../config/env";
import { observer, inject } from "../../../node_modules/mobx-react";
import { StackActions, NavigationActions } from "react-navigation";
import { LocationModul } from "../../libs/module";

@inject("store")
@observer
export default class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };

    // LocationModul.getLocation(
    //   err => {
    //     alert("Không thể lấy dữ liệu vị trí hiện tại. Vui lòng thử lại");
    //   },
    //   res => {
    //     alert(JSON.stringify(res));
    //   }
    // );
  }

  _retrieveToken = async () => {
    try {
      return await AsyncStorage.getItem(Config.asyncStorage.accessToken);
    } catch (error) {
      // Error retrieving data
      return null;
    }
  };

  _goToHome = data => {
    // this.props.navigation.navigate('Main', {
    //   data: data
    // });
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: "Home" })]
    });
    this.props.navigation.dispatch(resetAction);
  };

  componentWillMount() {
    this._retrieveToken().then(token => {
      if (token !== null) {
        FacebookAPI.getUserInfoById(token)
          .then(res => {
            this.props.store.changeLoginValue(true, res);
            this.setState({ isLoading: false });
          })
          .catch(err => alert(err));
      } else {
        //this._goToHome();
        this.props.navigation.navigate("Home");
      }
    });
  }

  componentWillUpdate() {
    if (!this.props.store.isLoading) {
      // this._goToHome();
      this.props.navigation.navigate("Home");
    }
  }

  render() {
    // {
    //   this.props.store.isLoading
    //     ? null
    //     : this.props.navigation.navigate("Home");
    // }
    return <SplashView />;
  }
}
