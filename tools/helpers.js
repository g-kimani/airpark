export function formatPrice(price) {
  if (!price) return "FREE";
  if (price < 1) {
    return `${price * 100}p`;
  } else {
    let [pounds, pennies] = String(price).split(".");
    if (!pennies) pennies = "";
    pennies = pennies.padEnd(2, "0");
    return `£${pounds}.${pennies}`;
  }
}
