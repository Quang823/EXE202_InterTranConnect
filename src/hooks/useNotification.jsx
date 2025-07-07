import { useEffect } from "react";
import * as signalR from "@microsoft/signalr";

export const useNotification = (userId, accessToken, onNotification) => {
  useEffect(() => {
    if (!userId || !accessToken) return;

    const connection = new signalR.HubConnectionBuilder()
      .withUrl(
        `${import.meta.env.VITE_API_URL.replace(
          /\/api$/,
          ""
        )}/hubs/notification`,
        {
          accessTokenFactory: () => accessToken,
        }
      )
      .withAutomaticReconnect()
      .build();

    connection.start();

    connection.on("ReceiveNotification", (notification) => {
      onNotification(notification);
    });

    return () => {
      connection.stop();
    };
  }, [userId, accessToken, onNotification]);
};
