export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

// Custom formatting for numbers
export function numberWithCommas(x) {
  // RegEx for number formatting? Browser compatibility issues -> https://stackoverflow.com/questions/2901102/how-to-format-a-number-with-commas-as-thousands-separators
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
