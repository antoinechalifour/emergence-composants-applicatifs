import "./styles.css";

import { render } from "react-dom";

import { Chat } from "./components/Chat-after-refactoring";
import { MessagerieFake } from "./model/MessagerieFake";
import { Messagerie } from "./model/Messagerie";
import { HttpMessagerie } from "./model/HttpMessagerie";
import { WebSocketMessagerie } from "./model/WebSocketMessagerie";

const MessagerieFactory = (type?: string): Messagerie => {
  switch (type) {
    case "HTTP":
      return new HttpMessagerie(process.env.REACT_APP_API_HTTP_URL!);
    case "WS": {
      const socket = new WebSocket(process.env.REACT_APP_API_WS_URL!);
      return new WebSocketMessagerie(socket);
    }
    default:
      return new MessagerieFake();
  }
};

const messagerie = MessagerieFactory(process.env.REACT_APP_MESSAGERIE);

console.log(process.env);

const rootElement = document.getElementById("root");
render(<Chat messagerie={messagerie} />, rootElement);
