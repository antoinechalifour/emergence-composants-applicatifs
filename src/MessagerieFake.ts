/*
 * Test double en mémoire de notre module de messagerie.
 */
import { Message, Messagerie, Subscribe, Unsubscribe } from "./Model";

export class MessagerieFake implements Messagerie {
  private _messages: Message[] = [];
  private _subscribers: Subscribe[] = [];
  private _lastId = 1;

  constructor() {
    /*
     * Dans un projet réel, une autre implémentation pourrait très bien recevoir des messages distants :
     * - en ouvrant un mécanisme de polling HTTP :
     *      setInterval(recupererMessages, temps)
     * - en utilisant les Server-Sent Events (SSE) :
     *      const eventSource = new EventSource('my-url')
     *      eventSource.onmessage = ...
     * - en ouvrant un WebSocket :
     *      const socket = new WebSocket('my-url')
     *      socket.addEventListener('message', ...)
     * - en ouvrant une connexion Peer-to-peer :
     *      rtcDataChannel.addEventListener('message', ...)
     * - ...
     */
  }

  envoyerMessage(contenu: string): void {
    /*
     * Dans un projet réel, une autre implémentation pourrait très bien envoyer les messages :
     * - en HTTP :
     *      axios.post('/mon-api/messages', { ... })
     * - en Peer-to-peer :
     *      rtcDataChannel.send({ ... })
     * - en Websocket :
     *      socket.send({ ... })
     * - ...
     *
     * Dans notre test, on se contente d'ajouter le message à un attribut privé _messages.
     */
    this._messages = this._messages.concat({
      id: `message-${this._lastId++}`,
      contenu,
    });

    this._subscribers.forEach((subscriber) => subscriber(this._messages));
  }

  onChange(subscribe: Subscribe): Unsubscribe {
    this._subscribers.push(subscribe);

    // Notre listener renvoie une fonction de "clean-up" afin d'éviter les fuites de mémoire.
    return () =>
      (this._subscribers = this._subscribers.filter((x) => x !== subscribe));
  }
}
