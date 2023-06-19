import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Inbox = () => {
  const navigator = useNavigation();
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        navigator.navigate("Chat");
      }}
    >
      <Image
        source={{
          uri: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
        }}
        style={styles.image}
      />
      <View style={styles.textBox}>
        <Text style={styles.text}>contact host username</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0F0F0",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 10,
    borderRadius: 20,
  },
  textBox: {
    flex: 1,
  },
  text: {
    fontSize: 16,
  },
});

export default Inbox;
