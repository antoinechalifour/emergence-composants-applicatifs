import { screen } from "@testing-library/dom";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Chat } from "./Chat-after-refactoring";

const zoneInput = () => screen.getByLabelText("Votre message");
const submitButton = () => screen.getByRole("button", { name: "Envoyer" });
const conversation = () => screen.queryAllByRole("listItem");
const leMessage = (contenu: string) => screen.getByText(contenu);

describe("<Chat />", () => {
  it("affiche les messages par leur ordre d'envoi chronologique", () => {
    // Given
    const premierMessageEnvoyé = "Bonjour";
    const deuxièmeMessageEnvoyé = "";
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
    expect(leMessage(premierMessageEnvoyé)).toBeVisible();
    expect(leMessage(deuxièmeMessageEnvoyé)).not.toBeVisible();
    expect(leMessage(troisièmeMessageEnvoyé)).toBeVisible();

    expect(conversation()[0]).toEqual(leMessage(premierMessageEnvoyé));
    expect(conversation()[1]).toEqual(leMessage(troisièmeMessageEnvoyé));
  });
});
