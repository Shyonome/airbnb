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

  const fetchData = async () => {
    try {
      if (email && password) {
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
          const userToken = "secret-token";
          setToken(userToken);
        }
      } else {
        console.log("Empty input");
        return <Text>EMPTY INPUT</Text>;
      }
    } catch (error) {
      alert("Connection failed !");
      console.log(error.message);
    }
  };

  return (
    <View>
      <View>
        <Image
          style={{ height: 150, width: 100 }}
          source={require("../assets/images/airbnb-logo.jpg")}
          resizeMode="contain"
        />
        <KeyboardAwareScrollView enableOnAndroid={true}>
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
        </KeyboardAwareScrollView>
        <TouchableOpacity
          onPress={() => {
            fetchData();
          }}
        >
          <Text>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("SignUp");
          }}
        >
          <Text>No account ? Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
