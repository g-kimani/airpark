import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { getParkingBookings, updateBookingStatus } from "../utils";
import tw from "twrnc";
import { formatPrice } from "../tools/helpers";

const BookingRequest = ({
  booking,
  updateRequest,
  showControls = false,
}: {
  updateRequest: any | undefined;
}) => {
  const [statusColour, setStatusColour] = useState("indigo-600");
  const handleStatusChange = (status) => {
    updateBookingStatus(booking.booking_id, status)
      .then(({ booking }) => {
        console.log(
          "🚀 ~ file: ParkingBookings.tsx:17 ~ updateBookingStatus ~ booking:",
          booking
        );
        updateRequest(booking);
      })
      .catch((err) => alert(err));
  };
  useEffect(() => {
    if (booking.status === "pending") {
      setStatusColour("indigo-600");
    } else if (booking.status === "confirmed") {
      setStatusColour("emerald-500");
    } else if (booking.status === "denied") {
      setStatusColour("red-600");
    }
  }, [booking]);
  return (
    <View
      style={tw`flex flex-row justify-between bg-white mx-4 my-2 rounded p-4`}
    >
      <View style={tw`flex justify-between`}>
        <Text style={tw` text-sm font-semibold`}>
          Start:
          <Text style={tw`font-medium text-gray-500`}>
            {new Date(booking.booking_start).toLocaleDateString()}
          </Text>
        </Text>
        <Text style={tw`text-sm font-semibold`}>
          End:
          <Text style={tw`font-medium text-gray-500`}>
            {new Date(booking.booking_end).toLocaleDateString()}
          </Text>
        </Text>
        <Text style={tw`text-sm font-semibold`}>
          Price:
          <Text style={tw`font-medium text-gray-500`}>
            {formatPrice(booking.price)}
          </Text>
        </Text>
      </View>
      <View style={tw``}>
        <View style={tw`flex flex-row justify-end`}>
          <View
            style={tw`p-1 shrink bg-slate-50 border-${statusColour} border-2 rounded `}
          >
            <Text style={tw`text-${statusColour} uppercase font-bold `}>
              {booking.status}
            </Text>
          </View>
        </View>
        {booking.status === "pending" && (
          <View style={tw`flex flex-row mt-2`}>
            <TouchableOpacity
              onPress={() => handleStatusChange("confirmed")}
              style={tw`rounded-md bg-emerald-500 px-3 py-2 shadow-sm mx-2`}
            >
              <Text style={tw`text-sm  font-bold text-white`}>Confirm</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleStatusChange("denied")}
              style={tw`rounded-md bg-white border-2 border-red-600 px-3 py-2 shadow-sm mx-auto`}
            >
              <Text style={tw`text-sm font-semibold text-red-600`}>Deny</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

const ParkingBookings = ({ route }) => {
  const { parking } = route.params;
  const [history, setHistory] = useState([]);
  const [requests, setRequests] = useState([]);
  useEffect(() => {
    getParkingBookings(parking.parking_id).then(({ bookings }) => {
      console.log(
        "🚀 ~ file: ParkingBookings.tsx:11 ~ getParkingBookings ~ bookings:",
        bookings
      );
      const requests: any[] = [];
      const history: any[] = [];
      bookings.forEach((booking) => {
        if (booking.status === "pending") {
          requests.push(booking);
        } else {
          history.push(booking);
        }
      });
      setHistory(history);
      setRequests(requests);
    });
  }, [parking]);

  const updateRequests = (index, booking) => {
    setRequests((prev) => {
      const newArr: any[] = [...prev];
      newArr.splice(index, 1);
      return newArr;
    });
    setHistory((prev) => {
      return [booking, ...prev];
    });
  };

  return (
    <ScrollView style={tw`p-4`}>
      <Text style={tw`text-lg font-semibold`}>Requests</Text>
      {requests.length ? (
        //   <FlatList data={requests} renderItem={renderBooking} />
        requests.map((request, index) => {
          return (
            <BookingRequest
              key={request.booking_id}
              updateRequest={(bk) => {
                updateRequests(index, bk);
              }}
              booking={request}
            />
          );
        })
      ) : (
        <View style={tw`flex items-center justify-center mt-8`}>
          <Text style={tw`text-lg font-semibold`}>No requests to see...</Text>
        </View>
      )}
      <Text style={tw`text-lg font-semibold`}>Booking History</Text>
      {history.length ? (
        history.map((booking) => (
          <BookingRequest key={booking.booking_id} booking={booking} />
        ))
      ) : (
        <View style={tw`flex items-center justify-center mt-8`}>
          <Text style={tw`text-lg font-semibold`}>No history to see...</Text>
        </View>
      )}
    </ScrollView>
  );
};

export default ParkingBookings;

const styles = StyleSheet.create({});
