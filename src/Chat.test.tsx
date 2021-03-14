import { screen, within } from "@testing-library/dom";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Chat } from "./Chat-after-refactoring";

const zoneInput = () => screen.getByLabelText("Votre message");
const submitButton = () => screen.getByRole("button", { name: "Envoyer" });
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
    userEvent.type(zoneInput(), premierMessageEnvoyé);
    userEvent.click(submitButton());

    userEvent.type(zoneInput(), deuxièmeMessageEnvoyé);
    userEvent.click(submitButton());

    userEvent.type(zoneInput(), troisièmeMessageEnvoyé);
    userEvent.click(submitButton());

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
