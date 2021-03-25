import React, { useEffect, useState } from "react";
import { Message, Messagerie } from "./Model";

interface ChatProps {
  messagerie: Messagerie;
}

export const Chat: React.FC<ChatProps> = ({ messagerie }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputvalue] = useState("");

  useEffect(() => messagerie.onChange(setMessages), [messagerie]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputValue.trim()) return;

    messagerie.envoyerMessage(inputValue);
    setInputvalue("");
  };

  return (
    <main>
      <ol aria-label="Messages de la conversation">
        {messages.map((message) => (
          <li key={message.id}>{message.contenu}</li>
        ))}
      </ol>

      <form onSubmit={handleSubmit}>
        <input
          id="votre-message"
          name="votre-message"
          type="text"
          value={inputValue}
          required
          minLength={1}
          onChange={(e) => setInputvalue(e.target.value)}
        />
        <label htmlFor="votre-message">Votre message</label>

        <button type="submit">Envoyer</button>
      </form>
    </main>
  );
};
