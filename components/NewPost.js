// uuden kirjauksen luonti
import React, { useState } from "react";
import { db } from "../firebase";
import { Button, Divider } from "react-native-elements";
import {
  Alert,
  View,
  Text,
  ImageBackground,
  TextInput,
  Image,
} from "react-native";
import styles from "./styles";
import { push, ref, set } from "firebase/database";
import bg from "../assets/bg.jpg";
import InputScrollView from "react-native-input-scroll-view";
import { auth } from "../firebase";
import * as ImagePicker from "expo-image-picker";

export default function NewPost({ navigation }) {
  var now = new Date();
  var months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  var month = months[now.getMonth()];
  //(now.getMonth() + 1)
  var dateTime =
    now.getDate() +
    " " +
    month +
    " " +
    now.getFullYear() +
    " " +
    now.getHours() +
    ":" +
    now.getMinutes();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [img, setImg] = useState(null);
  const date = dateTime;

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

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImg(result.uri);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={bg}
        resizeMode="cover"
        style={{
          justifyContent: "center",
          flex: 1,
          height: "100%",
        }}
      >
        <View style={styles.PostBox}>
          <Text style={{ alignSelf: "flex-end", color: "#ccb8bf" }}>
            {date}
          </Text>
          <Divider />
          <TextInput
            placeholder="Title"
            style={styles.inputStyle}
            onChangeText={(text) => setTitle(text)}
            value={title}
          />

          <Divider style={{ marginTop: 10 }} />
          <InputScrollView>
            <TextInput
              placeholder="Write something..."
              style={styles.inputStyleLong}
              onChangeText={(text) => setBody(text)}
              value={body}
              multiline
              numberOfLines={20}
              maxHeight={450}
            />
          </InputScrollView>

          <View
            style={{
              alignItems: "center",
              marginTop: 10,
              position: "absolute",
              bottom: 10,
              alignSelf: "center",
            }}
          >
            <View>
              {img && (
                <Image
                  source={{ uri: img }}
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 180 / 2,
                    alignSelf: "flex-end",
                    marginBottom: 10,
                  }}
                />
              )}
              <Button
                icon={{
                  name: "image",
                  type: "font-awesome",
                  size: 20,
                  color: "white",
                }}
                onPress={pickImage}
                containerStyle={{
                  position: "absolute",
                  left: 90,
                  bottom: 10,
                  borderRadius: 180 / 2,
                }}
                buttonStyle={{ backgroundColor: "#ffb8d4" }}
              />
            </View>
            <Button
              title="Save"
              onPress={save}
              buttonStyle={{
                width: 60,
                borderRadius: 10,
                backgroundColor: "#ffb8d4",
              }}
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

{
  /*
   <View style={styles.container}>
      <KeyboardAwareScrollView>
        <ImageBackground
          source={bg}
          resizeMode="cover"
          style={{ justifyContent: "center", flex: 1, width: "100%" }}
        >
          <View style={styles.newPostBox}>
            <Text style={{ alignSelf: "flex-end", color: "#ccb8bf" }}>
              {date}
            </Text>
            <Divider />
            <TextInput
              placeholder="Title"
              style={styles.inputStyle}
              onChangeText={(text) => setTitle(text)}
              value={title}
            />
            <Divider style={{ marginTop: 10 }} />
            <TextInput
              placeholder="Write something..."
              style={styles.inputStyleLong}
              onChangeText={(text) => setBody(text)}
              value={body}
              multiline={true}
              numberOfLines={5}
            />
            <View
              style={{
                alignItems: "center",
                marginTop: 10,
                position: "absolute",
                bottom: 10,
                alignSelf: "center",
              }}
            >
              <Button
                title="Save"
                onPress={save}
                buttonStyle={{
                  width: 60,
                  borderRadius: 10,
                  backgroundColor: "#ffb8d4",
                }}
              />
            </View>
          </View>
        </ImageBackground>
      </KeyboardAwareScrollView>
    </View>
  */
}
