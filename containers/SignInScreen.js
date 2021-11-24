import React, { useState } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/core";
import {
  Button,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function SignInScreen({ setToken }) {
  const navigation = useNavigation();
  const [data, setData] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
      if (email && password) {
        setError("");
        const response = await axios.post(
          "https://express-airbnb-api.herokuapp.com/user/log_in",
          {
            email: email,
            password: password,
          }
        );
        console.log(response.data);
        if (response.data) {
          setData(response.data);
          alert("Connected !");
          setToken(response.data.token);
        }
      } else {
        setError("Empty input");
      }
    } catch (error) {
      console.log(error.message);
      if (
        error.response.data.error === "This username already has an account." ||
        error.response.data.error === "This email already has an account."
      ) {
        setError(error.response.data.error);
      }
    }
  };

  return (
    <KeyboardAwareScrollView enableOnAndroid={true}>
      <View>
        <Image
          style={{ height: 150, width: 100 }}
          source={require("../assets/images/airbnb-logo.jpg")}
          resizeMode="contain"
        />
        <TextInput
          placeholder="email"
          onChangeText={(text) => {
            setEmail(text);
          }}
          value={email}
        />
        <TextInput
          placeholder="password"
          secureTextEntry={true}
          onChangeText={(text) => {
            setPassword(text);
          }}
          value={password}
        />
        <TouchableOpacity
          onPress={() => {
            fetchData();
          }}
        >
          <Text>Sign In</Text>
        </TouchableOpacity>
        <Text style={{ color: "red" }}>{error}</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("SignUp");
          }}
        >
          <Text>No account ? Register</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
}
