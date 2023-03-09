import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";

const Profile = ({ user }) => {
  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <Image
          source={{ uri: user.image }}
          style={styles.avatar}
        />
        <View style={styles.userInfo}>
          <Text style={styles.username}>{user.name}</Text>
          <Text style={styles.status}>Available</Text>
        </View>
        <View style={styles.separator} />
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>Status</Text>
          <Text style={styles.infoText}>{user.status == null ? "default status" : user.status}</Text>
        </View>
        <View style={styles.separator} />
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>Phone</Text>
          <Text style={styles.infoText}>+1 (123) 456-7890</Text>
        </View>
        <View style={styles.separator} />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Block</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.muteButton]}>
            <Text style={[styles.buttonText, styles.muteButtonText]}>Mute</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  body: {
    alignItems: "center",
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginVertical: 16,
  },
  userInfo: {
    alignItems: "center",
    marginBottom: 16,
  },
  username: {
    fontSize: 24,
    fontWeight: "bold",
  },
  status: {
    fontSize: 18,
    color: "lightgray",
  },
  separator: {
    height: 1,
    width: "90%",
    backgroundColor: "#c7c7c7",
    marginVertical: 16,
  },
  infoContainer: {
    width: "90%",
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  infoText: {
    fontSize: 18,
    color: "#000000",
  },
});

export default Profile;
