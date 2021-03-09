import React, { useState } from "react";

export const Chat = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [inputValue, setInputvalue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputValue.trim()) return;

    setMessages([...messages, inputValue]);
    setInputvalue("");
  };

  return (
    <main>
      <ol>
        {messages.map((message) => (
          <li key={message}>{message}</li>
        ))}
      </ol>

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
    </main>
  );
};
