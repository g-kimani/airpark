import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import { FlatList, StyleSheet } from "react-native";
import { Text } from "react-native";

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
        {/* <FlatList
          data={parkings}
          renderItem={({ item }) => (
            <Marker
              coordinate={{
                latitude: item.latitude,
                longitude: item.longitude,
              }}
            />
          )}
        /> */}
        {parkings.map((parking) => {
          return (
            <Marker
              coordinate={{
                latitude: parking.latitude,
                longitude: parking.longitude,
              }}
            />
          );
        })}
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