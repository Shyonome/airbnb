import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Button,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

export default function RoomScreen({ offerId }) {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://express-airbnb-api.herokuapp.com/rooms/${offerId}`
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
    <View>
      <Text>RoomScreen</Text>
      <View>
        <Image
          style={[styles.offersImage]}
          source={{ uri: data.photos[0].url }}
          resizeMode="cover"
        />
        <Text style={[styles.absolute, styles.price]}>{data.price}</Text>
      </View>

      <View style={[styles.row, styles.offer]}>
        <View style={[styles.column]}>
          <Text style={{ fontWeight: "bold" }} numberOfLines={1}>
            {data.title}
          </Text>
          <Text>{data.reviews} reviews</Text>
        </View>
        <Image
          style={[styles.userImage]}
          source={{ uri: data.user.account.photo.url }}
        />
      </View>
      <Text style={{ marginLeft: 15 }}>{data.description} reviews</Text>
    </View>
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

  offer: {
    marginLeft: 10,
  },

  offersImage: {
    height: 200,
    width: 500,
  },

  userImage: {
    height: 70,
    width: 70,
    borderRadius: 50,
  },

  price: {
    bottom: 15,
    height: 30,
    width: 70,
    textAlign: "center",
    color: "white",
    backgroundColor: "black",
  },
});
