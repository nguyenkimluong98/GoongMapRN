import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList, Dimensions } from "react-native";
import MapDisplayType from "../../components/MapDisplayType";

const { width } = Dimensions.get("window");

class MapDisplayTypeView extends Component {
  constructor(props) {
    super(props);
  }

  _renderItem = item => (
    <View
      style={[styles.itemMapType, item.id % 2 != 0 ? { marginLeft: 20 } : null]}
    >
      <MapDisplayType
        item={item}
        key={item.id}
        clicked={data => this.props.callBack("ON_CHANGE_MAP_TYPE", data)}
      />
    </View>
  );

  render() {
    const { data } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.textHeader}>Kiểu hiển thị bản đồ</Text>
        </View>
        <View style={styles.listMapType}>
          <FlatList
            numColumns={2}
            data={data}
            renderItem={({ item }) => this._renderItem(item)}
            keyExtractor={({ index }) => index + ""}
          />
        </View>
        {/* <View style={styles.descriptionTextWrapper}>
          <Text style={styles.descriptionText}>
            Chế độ tự động bản đồ sẽ tự động chuyển hiển thị ngày và đêm theo
            múi giờ của bạn
          </Text>
        </View> */}
      </View>
    );
  }
}

export default MapDisplayTypeView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    width: (width * 3) / 4 + 5
  },
  header: {
    backgroundColor: "lightgray"
  },
  textHeader: {
    fontSize: 20,
    fontWeight: "300",
    color: "black",
    margin: 10
  },
  itemMapType: {
    marginLeft: 20,
    marginTop: 20
  },
  listMapType: {
    marginBottom: 20
  },
  descriptionTextWrapper: {
    paddingHorizontal: 10,
    flexWrap: "wrap",
    backgroundColor: "white"
  },
  descriptionText: {
    fontSize: 16,
    color: "black"
  }
});
