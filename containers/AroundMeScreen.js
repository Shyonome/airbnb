import axios from "axios";
import React, { useState, useEffect } from "react";
import * as Location from "expo-location";
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import MapView from "react-native-maps";

export default function AroundMeScreen() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  useEffect(() => {
    const getCord = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === "granted") {
          const location = await Location.getCurrentPositionAsync();
          console.log(location);
          setLatitude(location.coords.latitude);
          setLongitude(location.coords.longitude);
          setIsLoading(false);
        } else {
          alert("Permission refusée !");
        }
      } catch (error) {
        console.log(error);
      }
    };
    getCord();

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://express-airbnb-api.herokuapp.com/rooms/around`
        );
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);
  return isLoading ? (
    <ActivityIndicator size="large" color="red" />
  ) : (
    <MapView
      style={[styles.map]}
      initialRegion={{
        latitude: 48.856614,
        longitude: 2.3522219,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      }}
    >
      {data.map((item, index) => {
        return (
          <MapView.Marker
            key={index}
            coordinate={{
              longitude: item.location[0],
              latitude: item.location[1],
            }}
          />
        );
      })}
    </MapView>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
  },

  column: {
    flexDirection: "column",
  },

  absolute: {
    position: "absolute",
  },

  map: {
    height: 575,
    width: 360,
  },
});
