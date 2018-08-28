import { Dimensions } from "react-native";
import { observable, action } from "../../../node_modules/mobx";

const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE = 21.0363357;
const LONGITUDE = 105.7664627;
const LATITUDE_DELTA = 0.00822;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class HomeStore {
  @observable mapType = "satellite";
  @observable
  currentRegion = {
    latitude: LATITUDE,
    longitude: LONGITUDE,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA
  };

  @action
  changeMapType(mapType) {
    this.mapType = mapType;
  }

  @action
  getPlaceData(data) {
    this.placeData = [...data];
  }

  @action
  changeCurrentRegion(region) {
    this.currentRegion = region;
    alert(JSON.stringify(this.currentRegion));
  }
}

export default HomeStore;
