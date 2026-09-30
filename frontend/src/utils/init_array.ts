/** @format */

export default function creat_hour_array(firstHour: number) {
  var hour_array = [];

  for (let i = firstHour; i < 24; i++) {
    console.log("for");
    hour_array.push(i);
  }
  hour_array.push(0);
  return hour_array;
}
