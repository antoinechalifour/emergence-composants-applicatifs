import { Messagerie, Subscribe, Unsubscribe } from "./Messagerie";
import { Message } from "./Message";

export abstract class BaseMessagerie implements Messagerie {
  private _messages: Message[] = [];
  private _lastId = 1;
  private _subscribers: Subscribe[] = [];

  abstract envoyerMessage(contenu: string): void;

  public onChange(subscribe: Subscribe): Unsubscribe {
    this._subscribers.push(subscribe);

    // Notre listener renvoie une fonction de "clean-up" afin d'éviter les fuites de mémoire.
    return () =>
      (this._subscribers = this._subscribers.filter((x) => x !== subscribe));
  }

  protected ajouterMessage(message: Message) {
    this._messages = this._messages.concat(message);
    this.notifySubscribers();
  }

  protected creerMessage(contenu: string): Message {
    return {
      id: `message-${this._lastId++}`,
      contenu,
    };
  }

  private notifySubscribers() {
    this._subscribers.forEach((subscriber) => subscriber(this._messages));
  }
}
