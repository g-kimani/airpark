import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import { FlatList, StyleSheet } from "react-native";
import { Text } from "react-native";
import * as Location from "expo-location";

type Props = {
  selectedLocation: {
    latitude: number;
    longitude: number;
  };
  parkings: any[];
};

const MapComponent = ({ selectedLocation, parkings }: Props) => {
  return (
    <>
      <MapView
        style={styles.map}
        region={{
          latitude: selectedLocation ? selectedLocation.latitude : 0,
          longitude: selectedLocation ? selectedLocation.longitude : 0,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker coordinate={{ latitude: 51.509865, longitude: -0.118092 }} />
        <FlatList
          data={parkings}
          renderItem={({ item }) => (
            <Marker
              coordinate={{
                latitude: item.latitude,
                longitude: item.longitude,
              }}
            />
          )}
        />
      </MapView>
    </>
  );
};
export default MapComponent;

const styles = StyleSheet.create({
  map: {
    height: 200,
    width: "100%",
  },
});
