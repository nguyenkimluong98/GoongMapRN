import React, { Component } from "react";
import {
  View,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Text
} from "react-native";

import color from "../config/color";
import constant from "../config/constant";

export default class ListOption extends Component {
  constructor(props) {
    super(props);
    this.dataLength = this.props.data.length;
    this.state = {
      rerender: false
    };
  }

  // state = {
  //   indexClicked: 0
  // };

  itemClicked = index => {
    const { data } = this.props;
    data.map(e => {
      if (data.indexOf(e) == index) {
        if (this.props.store.idClick == index) {
          this.props.changeIdClick(-1);
          e.isClick = false;
        } else {
          e.isClick = true;
          this.props.changeIdClick(index);
        }
      } else e.isClick = false;
    });
    this.setState({ rerender: false });
  };

  renderItem = (item, index) => {
    return (
      <TouchableOpacity
        style={[
          item.isClick == true
            ? { borderBottomWidth: 2, borderBottomColor: "white" }
            : null,
          {
            flexDirection: "row",
            justifyContent: "space-around",
            paddingHorizontal: 10,
            alignItems: "center"
          },
          this.dataLength > 4 ? null : { width: constant.width / 4 }
        ]}
        onPress={() => {
          this.itemClicked(index);
          this.props.onClick(item.id, index);
        }}
        key={item.id}
      >
        {item.img === undefined ? null : (
          <Image
            source={item.img}
            style={[
              styles.itemImage,
              item.isClick == true
                ? { tintColor: "white" }
                : { tintColor: "rgba(255,255,255, 0.4)" },
              { marginBottom: 2 }
            ]}
          />
        )}
        <Text
          style={[
            styles.textName,
            // item.id === 0 ? { marginLeft: 20 } : null,
            item.isClick == true ? { fontWeight: "500", color: "white" } : null,
            { marginBottom: 2 }
          ]}
        >
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  render() {
    const { data } = this.props;
    return (
      <View style={{ width: "100%" }}>
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          extraData={this.state}
          data={data}
          renderItem={({ item, index }) => this.renderItem(item, index)}
          keyExtractor={({ index }) => index + ""}
          style={{
            backgroundColor: color.headerBackground,
            height: 30
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  itemImage: {
    width: 15,
    height: 15
  },
  textName: {
    fontSize: 14,
    color: "rgba(255,255,255,0.8)"
  }
});
