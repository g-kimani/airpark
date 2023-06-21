import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import tw from "twrnc";

type Props = {
  status: string | undefined;
};
const BookingStatus = ({ status }: Props) => {
  const [statusColour, setStatusColour] = useState("indigo-600");
  useEffect(() => {
    if (status === "pending") {
      setStatusColour("indigo-600");
    } else if (status === "confirmed") {
      setStatusColour("emerald-500");
    } else if (status === "denied") {
      setStatusColour("red-600");
    }
  }, [status]);
  return (
    <View style={tw`flex flex-row justify-end`}>
      <View
        style={tw`p-1 shrink bg-slate-50 border-${statusColour} border-2 rounded `}
      >
        <Text style={tw`text-${statusColour} uppercase font-bold `}>
          {status}
        </Text>
      </View>
    </View>
  );
};

export default BookingStatus;

const styles = StyleSheet.create({});
