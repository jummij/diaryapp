import { StyleSheet, Dimensions } from "react-native";

const SCREEN_HEIGHT = Dimensions.get("screen").height;

export default StyleSheet.create({
  box: {
    width: "90%",
    height: "75%",
    borderRadius: 10,
    backgroundColor: "white",
    // justifyContent: "center",
    //flexDirection: "row",
    alignSelf: "center",
    marginTop: 10,
    padding: 30,
  },

  PostBox: {
    width: "90%",
    height: SCREEN_HEIGHT * 0.8,
    borderRadius: 10,
    backgroundColor: "white",
    alignSelf: "center",
    marginTop: 10,
    padding: 20,
    paddingBottom: 60,
  },

  container: {
    flex: 1,
    backgroundColor: "#fcf8f5",
  },

  intro: {
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    margin: 10,
    marginTop: 30,
  },

  addButton: {
    position: "absolute",
    bottom: 10,
    alignSelf: "flex-end",
    right: 10,
    width: 40,
  },
  logoutButton: {
    position: "absolute",
    bottom: 10,
    alignSelf: "flex-end",
    right: 10,
    width: 60,
  },

  inputStyle: {
    marginTop: 10,
    fontSize: 15,
    width: "100%",
    padding: 5,
  },

  inputStyleLong: {
    marginTop: 10,
    fontSize: 15,
    width: "100%",
    padding: 5,
    textAlignVertical: "top",
  },
});
