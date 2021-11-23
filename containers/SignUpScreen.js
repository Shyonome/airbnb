import axios from "axios";
import React, { useState } from "react";
import Textarea from "react-native-textarea";
import { useNavigation } from "@react-navigation/core";
import { Image, Text, TextInput, View, TouchableOpacity } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function SignUpScreen({ setToken }) {
  const navigation = useNavigation();
  const [data, setData] = useState();
  const [email, setEmail] = useState();
  const [username, setUsername] = useState();
  const [description, setDescription] = useState();
  const [password, setPassword] = useState();
  const [confirmpassword, setConfirmPassword] = useState();

  const fetchData = async () => {
    try {
      if (email && username && description && password && confirmpassword) {
        if (password === confirmpassword) {
          const response = await axios.post(
            "https://express-airbnb-api.herokuapp.com/user/sign_up",
            {
              email: email,
              username: username,
              description: description,
              password: password,
            }
          );
          console.log(response.data);
          if (response.data) {
            setData(response.data);
            const userToken = "secret-token";
            setToken(userToken);
          }
        } else {
          alert("No same password");
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <View>
      <Image
        style={{ height: 150, width: 100 }}
        source={require("../assets/images/airbnb-logo.jpg")}
        resizeMode="contain"
      />
      <View>
        <KeyboardAwareScrollView
          enableOnAndroid={true}
          enableAutomaticScroll={Platform.OS === "ios"}
        >
          <TextInput
            placeholder="email"
            onChangeText={(text) => {
              setEmail(text);
            }}
            value={email}
          />
          <TextInput
            placeholder="username"
            onChangeText={(text) => {
              setUsername(text);
            }}
            value={username}
          />
          <Textarea
            placeholder="description"
            onChangeText={(text) => {
              setDescription(text);
            }}
            value={description}
          />
          <TextInput
            placeholder="password"
            secureTextEntry={true}
            onChangeText={(text) => {
              setPassword(text);
            }}
            value={password}
          />
          <TextInput
            placeholder="confirm password"
            secureTextEntry={true}
            onChangeText={(text) => {
              setConfirmPassword(text);
            }}
            value={confirmpassword}
          />
        </KeyboardAwareScrollView>
        <TouchableOpacity
          title="Sign up"
          onPress={() => {
            fetchData();
          }}
        >
          <Text>Sign Up</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("SignIn");
        }}
      >
        <Text>Already an account ? Sign In</Text>
      </TouchableOpacity>
    </View>
  );
}
