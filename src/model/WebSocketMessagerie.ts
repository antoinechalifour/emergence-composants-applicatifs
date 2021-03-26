import { BaseMessagerie } from "./BaseMessagerie";

export class WebSocketMessagerie extends BaseMessagerie {
  constructor(private _socket: WebSocket) {
    super();

    this._socket.addEventListener("message", (e) => {
      this.ajouterMessage(JSON.parse(e.data));
    });
  }

  envoyerMessage(contenu: string): void {
    const message = this.creerMessage(contenu);
    this._socket.send(JSON.stringify(message));
    this.ajouterMessage(message);
  }
}
