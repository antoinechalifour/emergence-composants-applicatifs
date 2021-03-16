import React, { useState } from "react";

interface ConversationProps {
  messages: string[];
}

const Conversation = ({ messages }: ConversationProps) => (
  <ol aria-label="Messages de la conversation">
    {messages.map((message) => (
      <li key={message}>{message}</li>
    ))}
  </ol>
);

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

const isBlank = (message: string) => !message.trim();

const useChatViewModel = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const addNewMessage = (message: string) => {
    if (isBlank(message)) return;

    setMessages([...messages, message]);
  };

  return { messages, addNewMessage };
};

export const Chat = () => {
  const { messages, addNewMessage } = useChatViewModel();

  return (
    <main>
      <Conversation messages={messages} />
      <Rédaction onMessageAdded={addNewMessage} />
    </main>
  );
};
