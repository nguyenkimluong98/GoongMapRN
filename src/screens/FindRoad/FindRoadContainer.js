import React, { Component } from "react";
import FindRoadView from "./FindRoadView";
import { observable } from "../../../node_modules/mobx";
import { observer, inject } from "../../../node_modules/mobx-react";

const data = [
  // { id: 0, name: "Ô tô", img: require("../../assets/icons/iconCar.png") },
  // { id: 1, name: "Xe máy", img: require("../../assets/icons/iconMoto.png") },
  // { id: 2, name: "Taxi", img: require("../../assets/icons/iconTaxi.png") },
  // { id: 3, name: "Xe tải", img: require("../../assets/icons/iconTruck.png") }
];

@inject("store")
@observer
export default class FindRoadScreen extends Component {
  @observable
  departure = null;

  @observable
  arival = null;

  render() {
    return (
      <FindRoadView
        data={data}
        callBack={this.callBack}
        arival={this.arival}
        departure={this.departure}
      />
    );
  }

  // componentDidUpdate() {
  //   console.warn("update");
  // }

  _setFromTo = data => {
    if (data.from !== null) this.departure = data.from;
    if (data.to !== null) this.arival = data.to;
    // alert(JSON.stringify(data));
  };

  callBack = (key, data) => {
    switch (key) {
      case "BACK":
        this.props.navigation.goBack();
        break;
      case "TO_SEARCH_LOCATION":
        this.props.navigation.navigate("SearchLocation", {
          getInfo: this._setFromTo,
          fromFindRoad: true,
          field: data
        });
        break;
      case "SET_FROM_TO":
        if (this.departure == null && this.arival == null) {
          alert("Bạn phải nhập đầy đủ chuyến đường!");
        } else {
          this.props.store.changeFindRoadDestination(
            this.departure,
            this.arival
          );
          this.props.navigation.goBack();
        }
        break;
      default:
        break;
    }
  };
}
