import axiosClient from "@/config/axiosClient";
import { sendNotification } from "@/types/notification.types";

const sendNotice = (sendNotice: sendNotification) => {
  return axiosClient.post("/api/notifications/add-notification-for-users", sendNotice);
};

export {sendNotice}
