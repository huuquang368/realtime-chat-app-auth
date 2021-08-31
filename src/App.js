import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import AuthProvider from "./auth/AuthProvider";
import ChatRoom from "./components/ChatRoom";
import Login from "./components/Login";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Switch>
          <Route component={Login} path="/login" />
          <Route component={ChatRoom} path="/" />
        </Switch>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
