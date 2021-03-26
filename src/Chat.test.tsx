import { screen, within } from "@testing-library/dom";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Chat } from "./Chat-after-refactoring";
import { MessagerieFake } from "./MessagerieFake";

const zoneSaisie = () => screen.getByLabelText("Votre message");
const boutonEnvoyer = () => screen.getByRole("button", { name: "Envoyer" });
const laConversation = () =>
  screen.getByRole("list", { name: "Messages de la conversation" });
const leMessageALaPosition = (position: number) =>
  within(laConversation()).getAllByRole("listitem")[position - 1];

describe("<Chat />", () => {
  it("affiche les messages envoyés", () => {
    // Given
    render(<Chat messagerie={new MessagerieFake()} />);

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
