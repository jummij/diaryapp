//tietyn kirjauksen sisältö
import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Image } from "react-native";
import styles from "./styles";
import { Divider } from "react-native-elements";

export default function ViewPost({ route }) {
  const { title, body, date, image } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.PostBox}>
        <Text style={{ fontSize: 20, marginBottom: 10 }}>{title}</Text>
        <Text style={{ fontSize: 12, marginBottom: 15 }}>{date}</Text>
        <Divider />
        <View style={{ marginTop: 20 }}>
          {image ? (
            <Image
              source={{ uri: image }}
              style={{
                width: 180,
                height: 180,
                borderRadius: 180 / 2,
                alignSelf: "center",
              }}
            />
          ) : null}
        </View>
        <ScrollView>
          <Text style={{ marginTop: 20, textAlign: "justify", fontSize: 15 }}>
            {body}
          </Text>
        </ScrollView>
      </View>
    </View>
  );
}
