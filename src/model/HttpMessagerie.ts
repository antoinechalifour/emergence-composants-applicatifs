import { BaseMessagerie } from "./BaseMessagerie";

export class HttpMessagerie extends BaseMessagerie {
  constructor() {
    super();

    const eventSource = new EventSource("/api/messages-stream");
    eventSource.addEventListener("message", (e) => this.ajouterMessage(e.data));
  }

  async envoyerMessage(contenu: string): Promise<void> {
    const message = this.creerMessage(contenu);

    await fetch("/api/messages", {
      method: "POST",
      body: JSON.stringify(message),
    });

    this.ajouterMessage(message);
  }
}
