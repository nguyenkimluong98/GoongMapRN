import React, { Component } from "react";
import { View, StyleSheet, Animated, Dimensions, Alert } from "react-native";

import Drawer from "react-native-drawer";
import MapView, { Marker } from "react-native-maps";
import { ProgressDialog } from "react-native-simple-dialogs";

import SearchBar from "../../components/SearchBar";
import ListOption from "../../components/ListOption";

import { mapStyle } from "../../styles/map";
import constant from "../../config/constant";
import ScaleButton from "../../components/ScaleButton";
import CircleButton from "../../components/CircleButton";
import FollowButton from "../../components/FollowButton";
import SquareButton from "../../components/SquareButton";

import iconStar from "../../assets/icons/icons8_Star_Filled_60px.png";
import iconLocationBlank from "../../assets/icons/iconLocationBlank.png";
import iconDisplayMap from "../../assets/icons/iconDisplayMap.png";
import MapDisplayTypeScreen from "../MapDisplayType/MapDisplayTypeContainer";
import { observer } from "mobx-react";
import LocationDetail from "../../components/LocationDetail";
import AccountScreen from "../Menu/AccountContainer";
import color from "../../config/color";

const { width, height } = Dimensions.get("screen");

@observer
export default class HomeView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      top: new Animated.Value(constant.height - 25),
      hired: true,
      toggleMarkerFindLocate: false,
      longClicked: false,
      markerDetail: null,
      updated: true,
      polygonClick: false
    };

    this.id = 0;
  }

  openControlPanel = key => {
    if (key == "MAP_DISPLAY_TYPE") this._drawerMapType.open();
    else if (key == "MENU_SCREEN") {
      this.props.store.isLogining
        ? this._drawerMenu.open()
        : this.props.callBack("TO_LOGIN");
    }
  };

  _saveLocation = () => {
    if (this.state.markerDetail) {
      Alert.alert(
        "Lưu địa điểm",
        "Bạn có muốn lưu địa điểm này không?",
        [
          { text: "Cancel", onPress: null, style: "cancel" },
          {
            text: "OK",
            onPress: () =>
              this.props.callBack("SAVE_LOCATION", this.state.markerDetail)
          }
        ],
        { cancelable: false }
      );
    } else {
      Alert.alert(
        "Thông báo",
        "Bạn phải chọn một địa điểm trước!",
        [{ text: "OK", onPress: null }],
        { cancelable: true }
      );
    }
  };

  // animateHeader = hired => {
  //   if (!hired) {
  //     Animated.timing(this.state.top, {
  //       toValue: 0,
  //       duration: 400
  //     }).start();
  //   } else {
  //     Animated.timing(this.state.top, {
  //       toValue: this.state.top,
  //       duration: 400
  //     }).start();
  //   }
  // };

  animatePopupInfo = hired => {
    const { polygonClick } = this.state;
    if (hired) {
      Animated.timing(this.state.top, {
        toValue: polygonClick
          ? constant.height - constant.popupInfo + 5
          : constant.height - constant.popupInfo - 25,
        duration: 400
      }).start();
    } else {
      Animated.timing(this.state.top, {
        toValue: constant.height - 25,
        duration: 400
      }).start();
    }
  };

  finishGettingData = () => {
    this.animatePopupInfo(this.state.hired);
    this.setState({ hired: false });
  };

  onBackToCurrentLocation = region => {
    this.setState({ toggleMarkerFindLocate: false, longClicked: false });
    this.props.callBack("onRegionChangeComplete", region);
    this._myMap.animateToRegion(region, 1000);
  };

  onScaleMap = valueScale => {
    this.props.callBack("ZOOM", valueScale);
  };

  onAnimateToRegion = newRegion => {
    this._myMap.animateToRegion(newRegion, 500);
  };

  initMarkerFindLocate = e => {
    this.setState({ toggleMarkerFindLocate: false, longClicked: true });
    this._myMap.animateToCoordinate(e.coordinate, 500);
  };

  componentDidMount() {
    if (
      this.state.hired &&
      !this.props.isGettingData &&
      this.state.longClicked
    ) {
      animatePopupInfo(this.state.hired);
      this.setState({ hired: false });
    }
    // alert("hia");
  }

  componentDidUpdate() {
    if (this.props.locationToMove !== null && this.state.updated == true) {
      this._myMap.animateToCoordinate(this.props.locationToMove, 500);
      this.setState({ updated: false });
    }
  }

  fitPadding = (a, b) => {
    this._myMap.fitToCoordinates([a, b], {
      edgePadding: { top: 100, right: 100, bottom: 100, left: 100 },
      animated: true
    });
  };

  line = (text, textCase) => {
    if (this.state.polygonClick) {
      switch (textCase) {
        case "one":
          return "Thời gian: " + this.props.coords.detail.duration;

        case "two":
          return "Khoảng cách: " + this.props.coords.detail.distance;

        default:
          break;
      }
    } else {
      if (this.state.markerDetail !== null) return text;
      else "Searching";
    }
  };

  render() {
    const {
      placeData,
      callBack,
      data,
      store,
      isGettingData,
      coords
    } = this.props;
    const { currentRegion } = this.props.store.homeStore;
    // alert(JSON.stringify(this.props.store.userInfo));
    // const user = this.props.store.userInfo;
    return (
      <Drawer
        ref={ref => (this._drawerMenu = ref)}
        content={
          <AccountScreen
            userInfo={this.props.store.userInfo}
            store={store}
            _drawerMenu={this._drawerMenu}
            navigation={this.props.navigation}
          />
        }
        tapToClose={true}
        openDrawerOffset={0.25}
        panCloseMask={0.25}
        closedDrawerOffset={-3}
      >
        <ProgressDialog
          visible={isGettingData}
          title="Getting data"
          message="Please, wait..."
        />
        {this.state.hired && !this.props.isGettingData && this.state.longClicked
          ? this.finishGettingData()
          : null}
        <Drawer
          type={"overlay"}
          ref={ref => (this._drawerMapType = ref)}
          content={
            <MapDisplayTypeScreen
              onPressed={data => callBack("CHANGE_MAP_TYPE", data)}
            />
          }
          tapToClose={true}
          openDrawerOffset={0.25}
          panCloseMask={0.25}
          closedDrawerOffset={-3}
          side={"right"}
        >
          <View style={styles.container}>
            <MapView
              ref={ref => (this._myMap = ref)}
              style={styles.myMap}
              initialRegion={currentRegion}
              customMapStyle={mapStyle}
              mapType={this.props.store.homeStore.mapType}
              onRegionChangeComplete={e => {
                this.props.callBack("onRegionChangeComplete", e);
                if (this.props.store.idClick != -1) {
                  //alert("hihi");
                  this.props.callBack("GET_API_BY_CATEGORY", data[this.id].id);
                }
                if (this.state.longClicked)
                  this.setState({
                    toggleMarkerFindLocate: true
                  });
              }}
              onPress={() => {
                if (!this.state.hired) {
                  this.animatePopupInfo(this.state.hired);
                  this.setState({ hired: true });
                }
                this.setState({
                  toggleMarkerFindLocate: false,
                  longClicked: false,
                  markerDetail: null,
                  polygonClick: false
                });
              }}
              // onLongPress={e => {
              //   this.initMarkerFindLocate(e.nativeEvent);
              //   this.props.callBack("CHANGE_GETTING_DATA");
              // }}
            >
              {/* {this.state.updated ? (
                <MapViewDirections
                  origin={origin}
                  destination={destination}
                  apikey={"AIzaSyCYLQqvp2JWF9wofBJbQ_NfJLBZerNM3yA"}
                />
              ) : null} */}

              {coords !== undefined ? (
                <MapView.Polyline
                  strokeColor={color.headerBackground}
                  coordinates={coords.coords}
                  strokeWidth={5}
                  onPress={() => {
                    if (this.state.hired) {
                      this.animatePopupInfo(this.state.hired);
                      this.setState({ hired: false, polygonClick: true });
                    }
                    this.setState({ polygonClick: true });
                  }}
                />
              ) : null}

              {coords !== undefined
                ? coords.MARKERS.map(m => (
                    <Marker key={coords.MARKERS.indexOf(m)} coordinate={m} />
                  ))
                : null}

              <Marker
                coordinate={{
                  latitude: currentRegion.latitude,
                  longitude: currentRegion.longitude
                }}
                image={require("../../assets/icons/iconCurrentLocate.png")}
              />
              {this.props.locationToMove !== null && !this.state.updated ? (
                <Marker
                  coordinate={{
                    latitude: this.props.locationToMove.latitude,
                    longitude: this.props.locationToMove.longitude
                  }}
                  title={this.props.locationToMove.text}
                  description={this.props.locationToMove.secondText}
                  image={require("../../assets/icons/iconMarkerFindLocate.png")}
                />
              ) : null}
              {placeData.map(e => (
                <Marker
                  coordinate={e.gps}
                  image={data[this.id].icon}
                  key={e.id}
                  onPress={() => {
                    if (this.state.hired) {
                      this.animatePopupInfo(this.state.hired);
                      this.setState({ hired: false });
                    }
                    this.setState({
                      markerDetail: e,
                      polygonClick: false
                    });
                  }}
                />
              ))}
            </MapView>

            {/* {this.state.toggleMarkerFindLocate ? (
              <View
                style={{
                  position: "absolute",
                  top: -30,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Image
                  source={require("../../assets/icons/iconMarkerFindLocate.png")}
                  style={{ width: 30, height: 30 }}
                />
              </View>
            ) : null} */}
            <Animated.View
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0
              }}
            >
              <SearchBar
                onClick={() => this.openControlPanel("MENU_SCREEN")}
                onSearchClick={() => {
                  this.setState({ updated: true });
                  this.props.store.changeCoorMoveLocation(null);
                  this.props.callBack("SEARCH_LOCATION");
                }}
                ref="searchBar"
                store={store}
              />
              <ListOption
                data={this.props.data}
                changeIdClick={data => this.props.store.changeIdClick(data)}
                store={this.props.store}
                onClick={(id, index) => {
                  this.props.callBack("CHANGE_GETTING_DATA");
                  this.props.callBack("GET_API_BY_CATEGORY", id);
                  this.id = index;
                }}
              />
            </Animated.View>
            {this.state.hired ? (
              <View style={styles.scaleButton}>
                <ScaleButton
                  onButtonClick={valueScale => this.onScaleMap(valueScale)}
                />
              </View>
            ) : null}
            <View
              style={{
                position: "absolute",
                bottom: this.state.hired
                  ? height / 25
                  : height / 25 + constant.popupInfo,
                left: 20
              }}
            >
              <CircleButton
                icon={iconLocationBlank}
                onButtonClick={() =>
                  this.onBackToCurrentLocation(currentRegion)
                }
              />
            </View>
            <View
              style={{
                position: "absolute",
                bottom: height / 25,
                right: 15
              }}
            >
              {!this.state.polygonClick ? (
                <CircleButton
                  icon={iconStar}
                  onButtonClick={() => this._saveLocation()}
                />
              ) : null}
            </View>
            {!this.state.polygonClick ? (
              <View
                style={{
                  position: "absolute",
                  bottom: height / 25,
                  left: width / 2 - 60
                }}
              >
                <FollowButton
                  onButtonClick={() => this.props.callBack("FIND_ROAD")}
                />
              </View>
            ) : null}

            <View style={styles.squareDisplayMap}>
              <SquareButton
                imageSource={iconDisplayMap}
                onButtonClick={() => this.openControlPanel("MAP_DISPLAY_TYPE")}
              />
            </View>
          </View>
          <Animated.View
            style={{
              position: "absolute",
              left: this.state.polygonClick ? constant.width / 6 : 0,
              right: this.state.polygonClick ? constant.width / 6 : 0,
              top: this.state.top
            }}
          >
            <LocationDetail
              lineOne={this.line(
                this.state.markerDetail !== null
                  ? this.state.markerDetail.title
                  : null,
                "one"
              )}
              lineTwo={this.line(
                this.state.markerDetail !== null
                  ? this.state.markerDetail.address
                  : null,
                "two"
              )}
              lineThree={this.state.polygonClick}
              onButtonClick={this._saveLocation}
            />
          </Animated.View>
        </Drawer>
      </Drawer>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  myMap: { flex: 1 },
  scaleButton: {
    position: "absolute",
    bottom: height / 8,
    right: 20
  },
  squareNotification: {
    position: "absolute",
    top: 120,
    left: 20
  },
  squareSite: {
    position: "absolute",
    top: 170,
    left: 20
  },
  squareDisplayMap: {
    position: "absolute",
    top: 120,
    right: 20
  }
});
