import { io } from "socket.io-client";
import { socketURL } from "./config.js";

const socket = io(socketURL);
export default socket;
