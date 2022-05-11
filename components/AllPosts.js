import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from "react-native";
import { Button } from "react-native-elements";
import styles from "./styles";
import { DataSnapshot, onValue, ref, remove, doc } from "firebase/database";
import { Divider } from "react-native-elements";
import { auth } from "../firebase";

export default function AllPosts({ navigation }) {
  const [entries, setEntries] = useState([]);
  const [msg, setMsg] = useState("");
  const [search, setSearch] = useState("");
  const [keyRef, setKeyRef] = useState([]);

  useEffect(() => {
    const entriesRef = ref(db, auth.currentUser["uid"]);
    onValue(entriesRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        setEntries(Object.values(data));
        setKeyRef(Object.keys(data));
      } else {
        setEntries([]);
        setMsg("No entries yet!");
      }
    });
  }, []);

  let fullEntry = [entries, keyRef].reduce((c, v) => {
    v.forEach((o, i) => {
      c[i] = c[i] || [];
      c[i].push(o);
    });
    return c;
  }, []);

  const listSeparator = () => {
    return (
      <View style={{ marginTop: 5, marginBottom: 5 }}>
        <Divider />
      </View>
    );
  };

  const deleteEntry = (e) => {
    remove(ref(db, auth.currentUser["uid"] + "/" + e));
    console.log("Deleted entry:", e);
  };

  const confirmBox = (e) => {
    return Alert.alert(
      "Are you sure?",
      "Are you sure you want to delete this entry?",
      [{ text: "Yes", onPress: () => deleteEntry(e) }, { text: "No" }]
    );
  };

  const save = () => {
    if (title && body) {
      push(ref(db, auth.currentUser["uid"]), {
        title: title,
        body: body,
        image: img,
        date: date,
      }).then(
        navigation.navigate("Home"),
        Alert.alert("Great", "New entry has been posted!")
      );
    } else {
      Alert.alert("Oops!", "Check for empty inputs");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ backgroundColor: "white", height: 80 }}>
        <Text style={{ textAlign: "center", top: 45 }}> Entries </Text>
      </View>
      <View style={{ margin: 10, height: "85%" }}>
        <TextInput
          placeholder="Search for..."
          onChangeText={(text) => setSearch(text)}
          style={{
            backgroundColor: "white",
            padding: 10,
            margin: 10,
            borderRadius: 20,
          }}
        ></TextInput>
        <FlatList
          style={{ padding: 10 }}
          data={fullEntry.filter((item) => {
            if (search == "") {
              return fullEntry;
            } else if (
              item[0].title.toLowerCase().includes(search.toLowerCase())
            ) {
              return item;
            }
          })}
          keyExtractor={(item, i) => "key" + i}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("ViewPost", {
                  title: item[0].title,
                  body: item[0].body,
                  date: item[0].date,
                  image: item[0].image,
                });
              }}
            >
              <View
                style={{
                  backgroundColor: "white",
                  borderRadius: 5,
                  padding: 20,
                  flexDirection: "row",
                }}
              >
                <View>
                  <Text
                    style={{
                      fontSize: 18,
                      width: 230,
                    }}
                  >
                    {item[0].title}
                  </Text>
                  <Text style={{ fontSize: 10 }}>{item[0].date}</Text>
                </View>
              </View>
              <Button
                title=""
                onPress={(e) => confirmBox(item[1])}
                icon={{
                  name: "trash",
                  type: "font-awesome",
                  size: 23,
                  color: "gray",
                }}
                containerStyle={{
                  width: 47,
                  position: "absolute",
                  left: 270,
                  top: 20,
                }}
                buttonStyle={{ backgroundColor: null }}
              />
            </TouchableOpacity>
          )}
          ItemSeparatorComponent={listSeparator}
          // inverted
        />
      </View>
    </SafeAreaView>
  );
}
