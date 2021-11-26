import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import { FontAwesome } from "@expo/vector-icons";
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

export default function HomeScreen({ setOfferId }) {
  const navigation = useNavigation();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchData = async () => {
      setError();
      try {
        const response = await axios.get(
          "https://express-airbnb-api.herokuapp.com/rooms"
        );
        //console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
        setError("No offers sorry 😥");
      }
    };
    fetchData();
  }, []);

  const checkRating = (item) => {
    if (item.ratingValue === 1) {
      return (
        <View style={[styles.row]}>
          <FontAwesome name="star" size={32} />
          <FontAwesome name="star-o" size={32} />
          <FontAwesome name="star-o" size={32} />
          <FontAwesome name="star-o" size={32} />
          <FontAwesome name="star-o" size={32} />
        </View>
      );
    } else if (item.ratingValue === 2) {
      return (
        <View style={[styles.row]}>
          <FontAwesome name="star" size={32} />
          <FontAwesome name="star" size={32} />
          <FontAwesome name="star-o" size={32} />
          <FontAwesome name="star-o" size={32} />
          <FontAwesome name="star-o" size={32} />
        </View>
      );
    } else if (item.ratingValue === 3) {
      return (
        <View style={[styles.row]}>
          <FontAwesome name="star" size={32} />
          <FontAwesome name="star" size={32} />
          <FontAwesome name="star" size={32} />
          <FontAwesome name="star-o" size={32} />
          <FontAwesome name="star-o" size={32} />
        </View>
      );
    } else if (item.ratingValue === 4) {
      return (
        <View style={[styles.row]}>
          <FontAwesome name="star" size={32} />
          <FontAwesome name="star" size={32} />
          <FontAwesome name="star" size={32} />
          <FontAwesome name="star" size={32} />
          <FontAwesome name="star-o" size={32} />
        </View>
      );
    } else if (item.ratingValue === 5) {
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

  return isLoading ? (
    <ActivityIndicator size="large" color="red" />
  ) : (
    <View>
      {error && <Text>{error}</Text>}
      <FlatList
        data={data}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={[styles.offersContainer]}
              activeOpacity={0.8}
              onPress={() => {
                setOfferId(item._id);
                navigation.navigate("Room");
              }}
            >
              <View>
                <Image
                  style={[styles.offersImage]}
                  source={{ uri: item.photos[0].url }}
                />
                <Text style={[styles.absolute, styles.price]}>
                  {item.price}
                </Text>
              </View>

              <View style={[styles.row]}>
                <View style={[styles.column]}>
                  <Text>{item.title}</Text>
                  {checkRating(item)}
                  <Text>{item.reviews} reviews</Text>
                </View>
                <Image
                  style={[styles.userImage]}
                  source={{ uri: item.user.account.photo.url }}
                />
              </View>
            </TouchableOpacity>
          );
        }}
      />
      <Button
        title="Go to Profile"
        onPress={() => {
          navigation.navigate("Profile", data);
        }}
      />
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

  offersContainer: {
    marginTop: 20,
    marginLeft: 15,
    marginBottom: 10,
    borderBottomColor: "grey",
    borderBottomWidth: 2,
    width: 320,
  },

  offersImage: {
    height: 200,
    width: 330,
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
