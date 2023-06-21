import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Calendar } from "react-native-calendars";
import moment from "moment";

type Props = {
  startDate: string;
  endDate: string;
  setStart: any;
  setEnd: any;
  disabledDates?: any[];
};
const CalendarPicker = ({ startDate, endDate, setStart, setEnd }: Props) => {
  const [markedDates, setMarkedDates] = useState({});
  const formatDateYMD = (date: any) => {
    date = new Date(date);
    const year = date.getFullYear();
    const day = String(date.getDate());
    const month = String(date.getMonth() + 1);
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  };
  useEffect(() => {
    const markings: { [key: string]: any } = {};

    if (startDate === "") {
      setMarkedDates(markings);
      return;
    }

    markings[startDate] = {
      selected: true,
      color: "green",
      startingDay: true,
    };
    markings[endDate] = {
      selected: true,
      color: "green",
      endingDay: true,
    };

    const start = new Date(startDate);
    // if no end date selected use start date
    const endInterval = endDate === "" ? startDate : endDate;
    const end = new Date(endInterval);
    const time = new Date(end.getTime() - start.getTime()).getTime();
    // calculate the amount of days between the two dates
    const days = time / (1000 * 60 * 60 * 24) + 1;

    // there are days between end and start
    if (days > 2) {
      const dayCounter = new Date(start);
      dayCounter.setDate(dayCounter.getDate() + 1);
      while (dayCounter.getTime() < end.getTime()) {
        const dateString = formatDateYMD(dayCounter);
        markings[dateString] = {
          selected: true,
          color: "green",
        };
        dayCounter.setDate(dayCounter.getDate() + 1);
      }
    }
    setMarkedDates(markings);
  }, [startDate, endDate]);

  const handleDayPress = (day) => {
    const { dateString } = day;
    // reset values if clicking on set date
    if (dateString === startDate) {
      setStart("");
      setEnd("");
      return;
    }
    if (dateString === endDate) {
      setEnd("");
      return;
    }
    if (startDate) {
      setEnd(dateString);
    } else {
      setStart(dateString);
    }
  };
  return (
    <View>
      <Calendar
        style={{
          marginTop: 20,
        }}
        current={moment().format("YYYY-MM-DD")}
        minDate={moment().format("YYYY-MM-DD")}
        maxDate={moment().add(2, "months").format("YYYY-MM-DD")}
        onDayPress={handleDayPress}
        markingType="period"
        markedDates={markedDates}
      />
    </View>
  );
};

export default CalendarPicker;

const styles = StyleSheet.create({});
