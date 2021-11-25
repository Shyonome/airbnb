import axios from "axios";
import React, { useState, useEffect } from "react";
import { FontAwesome } from "@expo/vector-icons";
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

export default function RoomScreen({ offerId }) {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const checkRating = () => {
    if (data.ratingValue === 1) {
      return (
        <View style={[styles.row]}>
          <FontAwesome name="star" size={32} />
          <FontAwesome name="star-o" size={32} />
          <FontAwesome name="star-o" size={32} />
          <FontAwesome name="star-o" size={32} />
          <FontAwesome name="star-o" size={32} />
        </View>
      );
    } else if (data.ratingValue === 2) {
      return (
        <View style={[styles.row]}>
          <FontAwesome name="star" size={32} />
          <FontAwesome name="star" size={32} />
          <FontAwesome name="star-o" size={32} />
          <FontAwesome name="star-o" size={32} />
          <FontAwesome name="star-o" size={32} />
        </View>
      );
    } else if (data.ratingValue === 3) {
      return (
        <View style={[styles.row]}>
          <FontAwesome name="star" size={32} />
          <FontAwesome name="star" size={32} />
          <FontAwesome name="star" size={32} />
          <FontAwesome name="star-o" size={32} />
          <FontAwesome name="star-o" size={32} />
        </View>
      );
    } else if (data.ratingValue === 4) {
      return (
        <View style={[styles.row]}>
          <FontAwesome name="star" size={32} />
          <FontAwesome name="star" size={32} />
          <FontAwesome name="star" size={32} />
          <FontAwesome name="star" size={32} />
          <FontAwesome name="star-o" size={32} />
        </View>
      );
    } else if (data.ratingValue === 5) {
      return (
        <View style={[styles.row]}>
          <FontAwesome name="star" size={32} />
          <FontAwesome name="star" size={32} />
          <FontAwesome name="star" size={32} />
          <FontAwesome name="star" size={32} />
          <FontAwesome name="star" size={32} />
        </View>
      );
    }
  };

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
    <ScrollView>
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
          {checkRating()}
          <Text>{data.reviews} reviews</Text>
        </View>
        <Image
          style={[styles.userImage]}
          source={{ uri: data.user.account.photo.url }}
        />
      </View>
      <Text style={{ marginLeft: 15 }}>{data.description} reviews</Text>
      <View>
        <MapView
          style={[styles.map]}
          initialRegion={{
            longitude: data.location[0],
            latitude: data.location[1],
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}
        >
          <MapView.Marker
            coordinate={{
              longitude: data.location[0],
              latitude: data.location[1],
            }}
          />
        </MapView>
      </View>
    </ScrollView>
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

  map: {
    height: 300,
    width: 500,
    marginTop: 20,
    marginBottom: 50,
  },
});
