import axiosClient from "@/config/axiosClient";
import { sendNotification } from "@/types/notification.types";

const sendNotice = (sendNotice: sendNotification) => {
  return axiosClient.post(
    "/api/notifications/add-notification-for-users",
    sendNotice,
  );
};

const getAllNotice = (page: number) => {
  return axiosClient.get(`/api/notifications/user`, {
    params: {
      "page-index": page,
      "page-size": 50,
    },
  });
};

export { sendNotice, getAllNotice };
