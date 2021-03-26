import React, { useEffect, useState } from "react";

import { Message, Messagerie } from "./Model";

/*
Composant <Conversation /> qui affiche la liste des messages envoyés
 */

interface ConversationProps {
  messages: Message[];
}

const Conversation = ({ messages }: ConversationProps) => (
  <ol aria-label="Messages de la conversation">
    {messages.map((message) => (
      <li key={message.id}>{message.contenu}</li>
    ))}
  </ol>
);

/*
Composant <Rédaction /> qui permet la saisie de nouveaux messages
 */

interface RédactionProps {
  onMessageAdded: (message: string) => void;
}

const Rédaction = ({ onMessageAdded }: RédactionProps) => {
  const [inputValue, setInputvalue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onMessageAdded(inputValue);
    setInputvalue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        id="votre-message"
        name="votre-message"
        type="text"
        required
        minLength={1}
        value={inputValue}
        onChange={(e) => setInputvalue(e.target.value)}
      />
      <label htmlFor="votre-message">Votre message</label>

      <button type="submit">Envoyer</button>
    </form>
  );
};

/*
Viewmodel qui permet de binder les données à la vue
 */

const isBlank = (message: string) => !message.trim();

const useChat = (messagerie: Messagerie) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const addNewMessage = (contenu: string) => {
    if (isBlank(contenu)) return;

    messagerie.envoyerMessage(contenu);
  };

  useEffect(() => messagerie.onChange(setMessages), [messagerie]);

  return { messages, addNewMessage };
};

/*
Composant <Chat />, API publique de notre application
 */

interface ChatProps {
  messagerie: Messagerie;
}

export const Chat: React.FC<ChatProps> = ({ messagerie }) => {
  const { messages, addNewMessage } = useChat(messagerie);

  return (
    <main>
      <Conversation messages={messages} />
      <Rédaction onMessageAdded={addNewMessage} />
    </main>
  );
};
