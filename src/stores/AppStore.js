import { observable, action } from "mobx";
import HomeStore from "../screens/Home/HomeStore";
import FindRoadStore from "../screens/FindRoad/FindRoadStore";
class AppStore {
  @observable
  homeStore = new HomeStore();
  @observable
  findRoadStore = new FindRoadStore();
  @observable
  isLogining = false;

  @observable
  idClick = -1;

  @observable
  locationToMove = null;

  @observable
  departure = null;
  arival = null;

  @observable
  userInfo = {
    name: "",
    email: "",
    picture: {
      data: {
        url: ""
      }
    }
  };

  @action
  changeFindRoadDestination(departure, arival) {
    if (departure) {
      this.departure = departure;
    } else {
      this.departure = this.homeStore.currentRegion;
    }

    if (arival) {
      this.arival = arival;
    } else {
      this.arival = this.homeStore.currentRegion;
    }

    //alert(JSON.stringify(departure));
  }

  @action
  resetFromTo() {
    this.departure = this.arival = null;
  }

  @action
  changeIdClick(id) {
    this.idClick = id;
    // alert(this.idClick + " , " + id);
  }

  @action
  changeCoorMoveLocation(value) {
    this.locationToMove = value;
    // alert(JSON.stringify(value));
  }

  @action
  changeLoginValue(value = true, user) {
    //alert("vao tao roi");
    this.isLogining = value;
    this.userInfo = user;
  }
}

const store = new AppStore();
export default store;
