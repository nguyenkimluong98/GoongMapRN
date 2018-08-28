import React, { Component } from "react";
import { AsyncStorage } from "react-native";
import SavedLocationView from "./SavedLocationView";
import Config from "../../config/env";
import { observer, inject } from "../../../node_modules/mobx-react";
import { observable } from "../../../node_modules/mobx";
import * as MapAPI from "../../api/MapAPI";

import constant from "../../config/constant";

const ASPECT_RATIO = constant.width / constant.height;
const LATITUDE_DELTA = 0.00822;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

@inject("store")
@observer
export default class SavedLocationScreen extends Component {
  @observable
  locationSaved = [];

  render() {
    return (
      <SavedLocationView
        callBack={this.callBack}
        locationSaved={this.locationSaved}
      />
    );
  }

  callBack = (key, data) => {
    const { navigation } = this.props;
    switch (key) {
      case "BACK":
        navigation.goBack();
        break;
      case "DELETE_SAVED_LOCATION":
        this.locationSaved = this.locationSaved.filter(
          e => this.locationSaved.indexOf(e) !== data
        );
        break;
      case "DELETE_ALL_LOCATION":
        this.locationSaved = [];
        break;
      case "ANIMATE_TO_LOCATE":
        if (data.place_id !== undefined) {
          MapAPI.getDetailPlace(data.place_id)
            .then(res => {
              const newCoor = {
                latitude: res.result.geometry.location.lat,
                longitude: res.result.geometry.location.lng,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
                text: data.structured_formatting.main_text,
                secondText: data.structured_formatting.secondary_text
              };
              this.props.store.changeCoorMoveLocation(newCoor);
              this.props.navigation.navigate("Home");
            })
            .catch(err => console.warn(err.toString()));
        } else {
          const newCoor = {
            latitude: data.gps.latitude,
            longitude: data.gps.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
            text: data.title,
            secondText: data.address
          };
          this.props.store.changeCoorMoveLocation(newCoor);
          this.props.navigation.navigate("Home");
        }
        break;
      default:
        break;
    }
  };

  async componentWillMount() {
    try {
      let value = await AsyncStorage.getItem(Config.asyncStorage.savedLocation);
      if (value !== null) {
        this.locationSaved = JSON.parse(value);
      }
    } catch (error) {}
  }

  async componentWillUnmount() {
    try {
      await AsyncStorage.setItem(
        Config.asyncStorage.savedLocation,
        JSON.stringify(this.locationSaved)
      );
    } catch (error) {}
  }
}
