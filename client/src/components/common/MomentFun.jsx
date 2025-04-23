import moment from "moment";

export const getMomentDate = (date, format) => {
  return moment(date).format(format ? format : "DD/MM/YYYY");
};
export const getMomentTime = (time, format) => {
  return moment(time, "HH:mm").format(format ? format : "hh:mm A");
};
export const formatSecondsToMMSS = (seconds) => {
  const duration = moment.duration(seconds, "seconds");
  const minutes = duration.minutes();
  const remainingSeconds = duration.seconds();
  return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
    .toString()
    .padStart(2, "0")}`;
};
