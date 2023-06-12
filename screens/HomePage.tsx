import { StyleSheet, Text, View, TextInput, Image } from "react-native";
import React, { useState } from "react";

const HomePage = () => {
    const [parkingList, setParkingList] = useState([{ parking_id: 10,
        host_id: 10,
        price: 10,
        location: 'London',
        isBooked: false,
        imgUrl: 'https://images.pexels.com/photos/1500459/pexels-photo-1500459.jpeg?auto=compress&cs=tinysrgb&w=1600' 
    }, { parking_id: 10,
        host_id: 12,
        price: 10,
        location: 'London',
        isBooked: false,
        imgUrl: 'https://images.pexels.com/photos/1500459/pexels-photo-1500459.jpeg?auto=compress&cs=tinysrgb&w=1600' 
    }])

    console.log(parkingList)
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        
        <TextInput placeholder="Search for Parking" style={styles.inputText} />
       <ul>
        {parkingList.map((item)=> {
            return( <li key={item.host_id}>
            <Text>{item.price}</Text>
            <Text>{item.location}</Text>
            <img src={item.imgUrl}/>
            </li>
            )
        })}
        </ul>
      </View>
    );
  };
  
  export default HomePage;

  const styles = StyleSheet.create({
    button: {
        padding: 16,
        backgroundColor: "#039be5",
        borderRadius: 10,
        margin: 10,
      },
      buttonText: {
        color: "white",
        fontWeight: "700",
        fontSize: 16,
      },
      inputText: {
        padding: 16,
        backgroundColor: "#e0e0e0",
        borderRadius: 10,
        margin: 10,
        width: "60%",
      },
      signUpText: {
        color: "blue",
        fontSize: 16,
      },
      Header: {
        fontSize: 20,
      },
  });