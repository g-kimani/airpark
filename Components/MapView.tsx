import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import { StyleSheet } from "react-native";
import { Text } from "react-native";

type Props = {
  selectedLocation: {
    latitude: number;
    longitude: number;
  };
};

const MapComponent = ({ selectedLocation }: Props) => {
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
