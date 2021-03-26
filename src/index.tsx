import "./styles.css";

import { render } from "react-dom";

import { Chat } from "./components/Chat-after-refactoring";
import { MessagerieFake } from "./model/MessagerieFake";

const rootElement = document.getElementById("root");
render(<Chat messagerie={new MessagerieFake()} />, rootElement);
