import { io } from "socket.io-client";
import { socketURL } from "./config.js";

const token = localStorage.getItem("token");

const socket = io(socketURL, { auth: { token } });
export default socket;
