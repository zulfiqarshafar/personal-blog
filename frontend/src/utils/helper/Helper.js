import dayjs from "dayjs";

export const formatDate = (date) => {
  return dayjs(date).format("DD MMMM YYYY");
};

export const formatDateTime = (datetime) => {
  return dayjs(datetime).format("DD MMMM YYYY HH:mm:ss");
};
