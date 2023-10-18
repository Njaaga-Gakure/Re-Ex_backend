import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import UserProvider from "./contexts/UserProvider.jsx";
import FinancialsProvider from "./contexts/FinancialsProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <UserProvider>
    <FinancialsProvider>
      <App />
    </FinancialsProvider>
  </UserProvider>
);
