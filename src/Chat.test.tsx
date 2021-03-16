import { screen, within } from "@testing-library/dom";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Chat } from "./Chat-after-refactoring";

const zoneSaisie = () => screen.getByLabelText("Votre message");
const boutonEnvoyer = () => screen.getByRole("button", { name: "Envoyer" });
const laConversation = () =>
  screen.getByRole("list", { name: "Messages de la conversation" });
const leMessageALaPosition = (position: number) =>
  within(laConversation()).getAllByRole("listitem")[position - 1];

describe("<Chat />", () => {
  it("affiche les messages par leur ordre d'envoi chronologique", () => {
    // Given
    const premierMessageEnvoyé = "Bonjour";
    const deuxièmeMessageEnvoyé = "  ";
    const troisièmeMessageEnvoyé = "Comment allez-vous ?";
    render(<Chat />);

    // When
    userEvent.type(zoneSaisie(), premierMessageEnvoyé);
    userEvent.click(boutonEnvoyer());

    userEvent.type(zoneSaisie(), deuxièmeMessageEnvoyé);
    userEvent.click(boutonEnvoyer());

    userEvent.type(zoneSaisie(), troisièmeMessageEnvoyé);
    userEvent.click(boutonEnvoyer());

    // Then
    expect(laConversation().children).toHaveLength(2);
    expect(leMessageALaPosition(1))
      .toHaveTextContent(premierMessageEnvoyé)
      .toBeVisible();
    expect(leMessageALaPosition(2))
      .toHaveTextContent(troisièmeMessageEnvoyé)
      .toBeVisible();
  });
});
