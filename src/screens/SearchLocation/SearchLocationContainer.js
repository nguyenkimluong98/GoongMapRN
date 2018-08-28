import React, { Component } from "react";
import { AsyncStorage } from "react-native";
import SearchLocationView from "./SearchLocationView";
import * as MapAPI from "../../api/MapAPI";

import Config from "../../config/env";
import { observable } from "../../../node_modules/mobx";
import { observer, inject } from "../../../node_modules/mobx-react";
import constant from "../../config/constant";

const ASPECT_RATIO = constant.width / constant.height;
const LATITUDE_DELTA = 0.00822;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

@inject("store")
@observer
export default class SearchLocationScreen extends Component {
  @observable
  dataPlace = [];

  @observable
  searchedValue = [];

  constructor(props) {
    super(props);
    const { navigation } = this.props;
    this.getInfo = navigation.getParam("getInfo", null);
    this.fromFindRoad = navigation.getParam("fromFindRoad", false);
    this.field = navigation.getParam("field", "");
  }

  render() {
    return (
      <SearchLocationView
        callBack={this.callBack}
        dataPlace={this.dataPlace}
        searchedValue={this.searchedValue}
        fromFindRoad={this.fromFindRoad}
        field={this.field}
      />
    );
  }

  async componentWillMount() {
    try {
      let value = await AsyncStorage.getItem(Config.asyncStorage.searchedValue);
      if (value !== null) this.searchedValue = JSON.parse(value);
    } catch (error) {}
  }

  _storeDataSearched = async data => {
    try {
      if (data) this.searchedValue.push(data);
      await AsyncStorage.setItem(
        Config.asyncStorage.searchedValue,
        JSON.stringify(this.searchedValue)
      );
    } catch (error) {}
  };

  _storeLocationSaved = async data => {
    try {
      let value = await AsyncStorage.getItem(Config.asyncStorage.savedLocation);
      if (value !== null) {
        value = JSON.parse(value);
        value.push(data);
        await AsyncStorage.setItem(
          Config.asyncStorage.savedLocation,
          JSON.stringify(value)
        );
      } else {
        await AsyncStorage.setItem(
          Config.asyncStorage.savedLocation,
          JSON.stringify([data])
        );
      }
    } catch (error) {}
  };

  callBack = (key, data) => {
    const { navigation } = this.props;
    switch (key) {
      case "BACK":
        navigation.pop();
        break;
      case "TO_SAVED_LOCATION":
        navigation.navigate("SavedLocation");
        break;
      case "SEARCH_LOCATION":
        MapAPI.address(data.data)
          .then(res =>
            //alert(JSON.stringify(res.predictions))
            {
              this.dataPlace = res.predictions;
              // store data
              if (data.save) this._storeDataSearched(data.data);
            }
          )
          .catch(err => alert(err.toString()));
        break;
      case "SAVED_LOCATION":
        this._storeLocationSaved(data);
        break;
      case "DELETE_ROW_SEARCHED":
        this.searchedValue = this.searchedValue.filter(
          e => this.searchedValue.indexOf(e) !== data
        );
        this._storeDataSearched();
        break;
      case "ANIMATE_TO_LOCATE":
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
          .catch(err => console.log(err.toString()));
        break;
      case "SET_DATA_FIND_ROAD":
        this.getInfo(data);
        break;
      default:
        break;
    }
  };
}
