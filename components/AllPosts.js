import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
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

  useEffect(() => {
    const entriesRef = ref(db, auth.currentUser["uid"]);
    onValue(entriesRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        setEntries(Object.values(data));
        //console.log(entries);
      } else {
        setEntries([]);
        setMsg("No entries yet!");
      }
    });
  }, []);

  const listSeparator = () => {
    return (
      <View style={{ marginTop: 5, marginBottom: 5 }}>
        <Divider />
      </View>
    );
  };

  const deleteEntry = (id, i) => {
    entries;

    remove(ref(db, auth.currentUser["uid"] + "/" + id.key));
    console.log("Deleted entry:", id);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ backgroundColor: "white", height: 80 }}>
        <Text style={{ textAlign: "center", top: 50 }}> Entries </Text>
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
          style={{ marginTop: 5, padding: 10 }}
          data={entries.filter((item) => {
            if (search == "") {
              return entries;
            } else if (
              item.title.toLowerCase().includes(search.toLowerCase())
            ) {
              return item;
            }
          })}
          keyExtractor={(item, i) => "key" + i}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("ViewPost", {
                  title: item.title,
                  body: item.body,
                  date: item.date,
                  image: item.image,
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
                    {item.title}
                  </Text>
                  <Text style={{ fontSize: 10 }}>{item.date}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
          ItemSeparatorComponent={listSeparator}
          // inverted
        />
      </View>
    </SafeAreaView>
  );
}
