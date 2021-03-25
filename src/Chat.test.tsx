import { screen, within } from "@testing-library/dom";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Chat } from "./Chat-after-refactoring";
import { Message, Messagerie, Subscribe, Unsubscribe } from "./Model";

/*
 * Implémentation de test naïve, en mémoire de notre module de messagerie.
 */
class MessagerieTestImplementation implements Messagerie {
  private _messages: Message[] = [];
  private _subscribers: Subscribe[] = [];
  private _lastId = 1;

  envoyerMessage(contenu: string): void {
    /*
     * Dans un projet réel, cette implémentation pourrait très bien envoyer et recevoir les messages :
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

const zoneSaisie = () => screen.getByLabelText("Votre message");
const boutonEnvoyer = () => screen.getByRole("button", { name: "Envoyer" });
const laConversation = () =>
  screen.getByRole("list", { name: "Messages de la conversation" });
const leMessageALaPosition = (position: number) =>
  within(laConversation()).getAllByRole("listitem")[position - 1];

describe("<Chat />", () => {
  it("affiche les messages par leur ordre d'envoi chronologique", () => {
    // Given
    render(<Chat messagerie={new MessagerieTestImplementation()} />);

    // When
    userEvent.type(zoneSaisie(), "Bonjour");
    userEvent.click(boutonEnvoyer());

    userEvent.type(zoneSaisie(), "  ");
    userEvent.click(boutonEnvoyer());

    userEvent.type(zoneSaisie(), "Comment allez-vous ?");
    userEvent.click(boutonEnvoyer());

    userEvent.type(zoneSaisie(), "");
    userEvent.click(boutonEnvoyer());

    // Then
    expect(laConversation().children).toHaveLength(2);
    expect(leMessageALaPosition(1)).toHaveTextContent("Bonjour").toBeVisible();
    expect(leMessageALaPosition(2))
      .toHaveTextContent("Comment allez-vous ?")
      .toBeVisible();
  });
});
