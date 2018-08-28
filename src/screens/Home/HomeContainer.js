import React, { Component } from "react";
import { Dimensions, BackHandler, Alert, AsyncStorage } from "react-native";
import HomeView from "./HomeView";
import { observer, inject } from "mobx-react";
import * as SuperMapAPI from "../../api/SupperMapAPI";
import * as MapAPI from "../../api/MapAPI";
import { dataHomeTitle } from "../../assets/data/data";
import { observable } from "../../../node_modules/mobx";
import Config from "../../config/env";
import { decode } from "../../config/helper";

const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.10422;
import { LocationModul } from "../../libs/module";
@inject("store")
@observer
export default class HomeScreen extends Component {
  @observable
  placeData = [];
  coords = undefined;
  count = 0;

  @observable
  isGettingData = false;

  constructor(props) {
    super(props);
    const { currentRegion } = this.props.store.homeStore;
    this.region = this.newRegion = currentRegion;
    this.currentID = undefined;

    LocationModul.getLocation(
      err => {
        alert("LocationModul" + JSON.stringify(err));
      },
      ok => {
        alert("LocationModul" + JSON.stringify(ok));
      }
    );
  }

  componentWillMount() {
    BackHandler.addEventListener("hardwareBackPress", this.backPressed);
  }

  // _doHoi = () => {
  //   console.warn("vao roi");
  //   if (this.props.store.locationToMove !== null)
  //     this.refs.HomeView.onAnimateToRegion(this.props.store.locationToMove);
  // };

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.backPressed);
  }

  _storeLocation = async data => {
    try {
      let value = await AsyncStorage.getItem(Config.asyncStorage.savedLocation);
      // alert(JSON.stringify(data));
      // return;
      if (value !== null) {
        value = JSON.parse(value);
        value.push(data);
        await AsyncStorage.setItem(
          Config.asyncStorage.savedLocation,
          JSON.stringify(value)
        );
      } else
        await AsyncStorage.setItem(
          Config.asyncStorage.savedLocation,
          JSON.stringify([data])
        );
    } catch (error) {
      alert(error);
    }
  };

  backPressed = () => {
    Alert.alert(
      "Exit App",
      "Do you want to exit?",
      [
        {
          text: "No",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Yes", onPress: () => BackHandler.exitApp() }
      ],
      { cancelable: false }
    );

    return true;
  };

  static navigationOptions = {
    header: null
  };

  direct = (from, to, type = "driving") => {
    this.count++;
    MapAPI.getDriect(
      // this.location.lat + ',' + this.location.lng,
      // this.dataEnd.gps.latitude + ',' + this.dataEnd.gps.longitude,
      from,
      to,
      type
    )
      .then(responseJson => {
        if (responseJson.routes.length > 0) {
          this.coords = undefined;
          var cortemp = decode(responseJson.routes[0].overview_polyline.points);
          var length = cortemp.length - 1;

          var tempMARKERS = [];
          tempMARKERS.push(cortemp[0]);
          tempMARKERS.push(cortemp[length]);

          console.log("tempMARKERS : " + JSON.stringify(tempMARKERS));
          this.coords = {
            coords: cortemp,
            MARKERS: tempMARKERS,
            destMarker: cortemp[length],
            startMarker: cortemp[0],
            detail: {
              duration: responseJson.routes[0].legs[0].duration.text,
              distance: responseJson.routes[0].legs[0].distance.text
            }
          };
          //alert("vao direct");
          this.props.store.resetFromTo();
        } else {
          if (this.count > 5) {
            alert("Không có đường phù hợp");
            this.count = 0;
          } else {
            this.direct(from, to, type);
          }
        }
      })
      .catch(e => {});
  };

  componentDidUpdate = async () => {
    const { departure, arival } = this.props.store;
    if (departure !== null && arival !== null) {
      //alert("di: " + departure.description + "\nden: " + arival.description);
      let de = undefined,
        ar = undefined;
      if (departure.place_id !== undefined) {
        await MapAPI.getDetailPlace(departure.place_id)
          .then(res => {
            const { lat, lng } = res.result.geometry.location;
            de = { latitude: lat, longitude: lng };
            //alert(JSON.stringify(de));
          })
          .catch(err => {});
      } else {
        de = {
          latitude: departure.latitude,
          longitude: departure.longitude
        };
      }

      if (arival.place_id !== undefined) {
        await MapAPI.getDetailPlace(arival.place_id)
          .then(res => {
            const { lat, lng } = res.result.geometry.location;
            ar = { latitude: lat, longitude: lng };
          })
          .catch(err => {});
      } else {
        ar = {
          latitude: arival.latitude,
          longitude: arival.longitude
        };
      }

      await this.direct(
        de.latitude + "," + de.longitude,
        ar.latitude + "," + ar.longitude
      );

      this.refs.HomeView.fitPadding(de, ar);
    }
  };

  render() {
    return (
      <HomeView
        ref="HomeView"
        store={this.props.store}
        callBack={this.callBack}
        placeData={this.placeData}
        data={dataHomeTitle}
        isGettingData={this.isGettingData}
        changeGettingData={this.changeGettingData}
        locationToMove={this.props.store.locationToMove}
        arival={this.props.store.arival}
        departure={this.props.store.departure}
        coords={this.coords}
        navigation={this.props.navigation}
      />
    );
  }

  callBack = (key, data) => {
    const { store } = this.props;
    switch (key) {
      case "onRegionChangeComplete":
        this.newRegion = data;
        break;
      case "EMPTY_PLACE_DATA":
        this.placeData = [];
        break;
      case "SAVE_LOCATION":
        this._storeLocation(data);
        break;

      case "ZOOM":
        if (
          this.newRegion.latitudeDelta * data <=
            LATITUDE_DELTA / Math.pow(2, 6) ||
          this.newRegion.latitudeDelta * data >= LATITUDE_DELTA * Math.pow(2, 9)
        )
          return;
        this.region = {
          ...this.newRegion,
          latitudeDelta: this.newRegion.latitudeDelta * data,
          longitudeDelta: this.newRegion.latitudeDelta * data * ASPECT_RATIO
        };
        this.refs.HomeView.onAnimateToRegion(this.region);
        this.newRegion = this.region;
        break;
      case "CHANGE_MAP_TYPE":
        store.homeStore.changeMapType(data);
        break;
      case "FIND_ROAD":
        this.props.navigation.navigate("FindRoad");
        break;
      case "SEARCH_LOCATION":
        this.props.navigation.navigate("SearchLocation");
        break;
      case "GET_API_BY_CATEGORY":
        if (this.props.store.idClick == -1) {
          this.placeData = [];
          this.isGettingData = false;
        } else {
          SuperMapAPI.getCategory(
            500,
            this.newRegion.latitude,
            this.newRegion.longitude,
            data
          ).then(res => {
            this.placeData = res.data;
            this.isGettingData = false;
          });
        }

        break;
      case "TO_LOGIN":
        this.props.navigation.navigate("Login");
        break;
      case "CHANGE_GETTING_DATA":
        this.isGettingData = true;
        break;
      default:
        break;
    }
  };
}
