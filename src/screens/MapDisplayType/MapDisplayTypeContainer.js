import React, { Component } from "react";
import MapDisplayTypeView from "./MapDisplayTypeView";

const data = [
  {
    id: 0,
    title: "Tắt bản đồ",
    type: "none",
    img: require("../../assets/images/none.png")
  },
  {
    id: 1,
    title: "Chuẩn",
    type: "standard",
    img: require("../../assets/images/standard.png")
  },
  {
    id: 2,
    title: "Vệ tinh",
    type: "satellite",
    img: require("../../assets/images/vetinh.png")
  },
  {
    id: 3,
    title: "Địa hình",
    type: "terrain",
    img: require("../../assets/images/diahinh.png")
  }
];

class MapDisplayTypeScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <MapDisplayTypeView data={data} callBack={this.callBack} />;
  }

  callBack = (key, data) => {
    switch (key) {
      case "ON_CHANGE_MAP_TYPE":
        this.props.onPressed(data);
        break;
      default:
        break;
    }
  };
}

export default MapDisplayTypeScreen;
