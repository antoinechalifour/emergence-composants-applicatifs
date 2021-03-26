import "./styles.css";

import { render } from "react-dom";

import { Chat } from "./components/Chat-after-refactoring";

const rootElement = document.getElementById("root");
render(<Chat />, rootElement);
