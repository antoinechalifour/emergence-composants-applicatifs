import React, { useState } from "react";

interface ConversationProps {
  messages: string[];
}

const Conversation = ({ messages }: ConversationProps) => (
  <ol aria-label='Messages de la conversation'>
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

    if (!inputValue.trim()) return;

    onMessageAdded(inputValue);
    setInputvalue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        id="votre-message"
        name="votre-message"
        type="text"
        value={inputValue}
        onChange={(e) => setInputvalue(e.target.value)}
      />
      <label htmlFor="votre-message">Votre message</label>

      <button type="submit">Envoyer</button>
    </form>
  );
};

const useChatViewModel = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const addNewMessage = (message: string) =>
    setMessages([...messages, message]);

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
