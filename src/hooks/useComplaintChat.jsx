import { useEffect, useRef } from "react";
import * as signalR from "@microsoft/signalr";

/**
 * Kết nối SignalR để nhận tin nhắn khiếu nại realtime.
 * @param {string} userId - ID người dùng hiện tại.
 * @param {string} accessToken - Token xác thực.
 * @param {function} onMessage - Callback khi nhận được tin nhắn mới.
 */
export const useComplaintChat = (userId, accessToken, onMessage) => {
  const connectionRef = useRef(null);

  useEffect(() => {
    if (!userId || !accessToken) return;

    const connection = new signalR.HubConnectionBuilder()
      .withUrl("http://localhost:5000/hubs/notification", {
        accessTokenFactory: () => accessToken,
      })
      .withAutomaticReconnect()
      .build();

    connection.start();

    connection.on("ReceiveComplaintMessage", (message) => {
      onMessage && onMessage(message);
    });

    connectionRef.current = connection;

    return () => {
      connection.stop();
    };
  }, [userId, accessToken, onMessage]);
};
