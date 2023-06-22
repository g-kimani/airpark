export function formatPrice(price) {
  if (!price) return "FREE";
  if (price < 1) {
    return `${(price * 100).toFixed(0)}p`;
  } else {
    let [pounds, pennies] = String(price).split(".");
    if (!pennies) pennies = "";
    pennies = pennies.padEnd(2, "0");
    return `£${pounds}.${pennies}`;
  }
}

export function formatDate(date) {
  const currentDate = new Date();
  const formattedDate = new Date(date);

  const withinAWeek =
    Math.abs(currentDate - formattedDate) < 7 * 24 * 60 * 60 * 1000;

  if (false) {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const dayOfWeek = daysOfWeek[formattedDate.getDay()];
    return dayOfWeek;
  } else {
    const day = String(formattedDate.getDate()).padStart(2, "0");
    const month = String(formattedDate.getMonth() + 1).padStart(2, "0");
    const year = formattedDate.getFullYear();
    return `${day}/${month}/${year}`;
  }
}
export function getDaysBetweenDates(startDate, endDate) {
  const oneDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
  const start = new Date(startDate);
  const end = new Date(endDate);

  // Calculate the difference in days
  const diffInDays = Math.round(Math.abs((start - end) / oneDay)) + 1;

  return diffInDays;
}
const bookingsCompare = (bookingA, bookingB) => {
  const statusA = bookingA.status?.toLowerCase();
  const statusB = bookingB.status?.toLowerCase();
  if (statusA === "pending" && statusB === "confirmed") {
    return 1;
  }
  if (statusA === "confirmed" && statusB === "pending") {
    return -1;
  }
  if (statusA === "denied" && statusB === "confirmed") {
    return -1;
  }
  if (statusA === "confirmed" && statusB === "denied") {
    return 1;
  }
  if (statusA === "denied" && statusB === "pending") {
    return -1;
  }
  if (statusA === "pending" && statusB === "denied") {
    return 1;
  }

  return 0;
};

export function sortBookings(bookings) {
  const arr = [...bookings];
  arr.sort(bookingsCompare);
  return arr.reverse();
}
