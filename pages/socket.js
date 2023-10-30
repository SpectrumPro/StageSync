import { useEffect } from "react";
import io from "socket.io-client";

const Home = () => {
  useEffect(() => {
    const socket = io("ws://localhost:3000/api/socketio.js"); // Specify the server URL here

    socket.on("connect", () => {
      console.log("connected to server");
    });

    socket.on("disconnect", () => {
      console.log("disconnected from server");
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return <div className="text-black">Socket.io with Next.js</div>;
};

export default Home;
