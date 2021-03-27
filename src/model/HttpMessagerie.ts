import { BaseMessagerie } from "./BaseMessagerie";

export class HttpMessagerie extends BaseMessagerie {
  constructor(private _baseUrl: string) {
    super();

    const eventSource = new EventSource(this._endpoint("/api/messages/stream"));
    eventSource.addEventListener("message", (e) =>
      this.ajouterMessage(JSON.parse(e.data))
    );
  }

  envoyerMessage(contenu: string): void {
    const message = this.creerMessage(contenu);

    fetch(this._endpoint("/api/messages"), {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(message),
    });

    this.ajouterMessage(message);
  }

  private _endpoint(path: string) {
    return `${this._baseUrl}${path}`;
  }
}
