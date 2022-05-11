import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  View,
  Text,
  ImageBackground,
  Image,
  Alert,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import styles from "./styles";
import bg from "../assets/bg.jpg";
import { Button, Overlay, Divider } from "react-native-elements";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { ref, query, limitToLast, onValue } from "firebase/database";

export default function Home({ navigation }) {
  const [dog, setDog] = useState([]);
  const [visible, setVisible] = useState(false);
  const [latest, setLatest] = useState([]);
  const [msg, setMsg] = useState("");

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

  const latestEntry = async () => {
    const entries = query(ref(db, auth.currentUser["uid"]), limitToLast(1));
    onValue(entries, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        if (snapshot.exists()) {
          const childKey = childSnapshot.key;
          const childData = childSnapshot.val();
          setLatest(childData);
          setMsg("Check out your latest entry!");
        } else {
          setLatest([]);
          setMsg("No entries yet :(");
        }
      });
    });

    /*onValue(entries, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        setLatest(Object.values(data));
        console.log(latest[0].title);
      } else {
        setLatest([]);
        setMsg("No entries yet!");
      }
    }); */
  };

  useEffect(() => {
    fetchDog();
    latestEntry();
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

          {latest ? (
            <View style={{ height: "85%" }}>
              <Text style={{ textAlign: "center", marginTop: 10 }}>{msg}</Text>
              <View
                style={{
                  width: "90%",
                  borderRadius: 10,
                  backgroundColor: "#f5f0eb",
                  alignSelf: "center",
                  marginTop: 10,
                  padding: 20,
                  paddingBottom: 10,
                  height: "80%",
                }}
              >
                <Text style={{ fontSize: 15, marginBottom: 4 }}>
                  {latest.title}
                </Text>
                <Text style={{ fontSize: 11, marginBottom: 10 }}>
                  {latest.date}
                </Text>
                <Divider />
                <View style={{ marginTop: 10 }}>
                  {latest.image ? (
                    <Image
                      source={{ uri: latest.image }}
                      style={{
                        width: 90,
                        height: 90,
                        borderRadius: 180 / 2,
                        alignSelf: "center",
                      }}
                    />
                  ) : null}
                </View>
                <ScrollView>
                  <Text
                    style={{
                      marginTop: 10,
                      textAlign: "justify",
                      fontSize: 13,
                    }}
                  >
                    {latest.body}
                  </Text>
                </ScrollView>
              </View>
            </View>
          ) : (
            <Text style={{ textAlign: "center", marginTop: 10 }}>{msg}</Text> // ei toimi
          )}

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
