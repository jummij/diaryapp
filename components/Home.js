// tänne tulee view
//jonka sisälle tulee view, joka tulostaa kaikki päiväkirjan postaukset?
//Ja + nappi alaoikealle reunalle, josta pääsee NewPost komponenttiin
import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import styles from "./styles";
import bg from "../assets/bg.jpg";
import { Button, Overlay } from "react-native-elements";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export default function Home({ navigation }) {
  const [dog, setDog] = useState([]);
  const [visible, setVisible] = useState(false);

  var now = new Date();
  var days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  var day = days[now.getDay()];

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const fetchDog = () => {
    fetch("https://random.dog/woof.json?ref=apilist.fun")
      .then((response) => response.json())
      .then((data) => setDog(data))
      .catch((err) => Alert.alert("Error", "Something went wrong"));
  };

  useEffect(() => {
    fetchDog();
  }, []);

  const handleSignOut = () => {
    signOut(auth)
      .then((re) => {
        navigation.navigate("Login");
      })
      .catch((err) => {
        console.log(re);
      });
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={bg}
        resizeMode="cover"
        style={{ justifyContent: "center", flex: 1, width: "100%" }}
      >
        <View style={styles.intro}>
          <View style={styles.logoutButton}>
            <Button
              icon={{
                name: "exit-outline",
                type: "ionicon",
                size: 30,
                color: "#6e5143",
              }}
              onPress={handleSignOut}
              buttonStyle={{ backgroundColor: null }}
            />
          </View>
          <Text style={{ textAlign: "center", fontSize: 20 }}>{day}</Text>
        </View>
        <View style={styles.box}>
          <Text style={{ textAlign: "center", fontSize: 17 }}>
            Doggies make everyone happy!
          </Text>
          <Button
            title="Give me a dog!"
            onPress={toggleOverlay}
            buttonStyle={{
              width: 130,
              borderRadius: 10,
              backgroundColor: "#ffb8d4",
              alignSelf: "center",
              margin: 10,
            }}
          />

          <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
            <Image
              source={{ uri: dog.url }}
              style={{
                height: 300,
                width: 300,
                alignSelf: "center",
                borderRadius: 20,
              }}
            />
          </Overlay>

          <View style={styles.addButton}>
            <Button
              title="+"
              onPress={() => navigation.navigate("Add")}
              buttonStyle={{
                borderRadius: 40,
                backgroundColor: "#ffb8d4",
              }}
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}
