import { Message } from "./Message";

export type Unsubscribe = () => void;
export type Subscribe = (messages: Message[]) => void;

export interface Messagerie {
  envoyerMessage(contenu: string): void;
  onChange(subscribe: Subscribe): Unsubscribe;
}
