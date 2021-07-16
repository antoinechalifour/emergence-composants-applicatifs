import React, { useEffect, useState } from "react";

import { Messagerie } from "../model/Messagerie";
import { Message } from "../model/Message";
import { CustomButton } from "./CustomButton";
import { CustomInput } from "./CustomInput";

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

interface SendButtonProps {
  label: string;
}

const SendButton = ({ label }: SendButtonProps) => (
  <CustomButton type="submit">
    <i className="fa fa-send" /> {label}
  </CustomButton>
);

interface NewMessageInputProps {
  value: string;
  onChange: (newValue: string) => void;
}

const NewMessageInput = ({ value, onChange }: NewMessageInputProps) => (
  <CustomInput
    label="Votre message"
    name="votre-message"
    value={value}
    onChange={onChange}
    inputProps={{
      required: true,
      minLength: 1,
    }}
  />
);

const Rédaction = ({ onMessageAdded }: RédactionProps) => {
  const [inputValue, setInputvalue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onMessageAdded(inputValue);
    setInputvalue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <NewMessageInput value={inputValue} onChange={setInputvalue} />
      <SendButton label="Envoyer" />
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
