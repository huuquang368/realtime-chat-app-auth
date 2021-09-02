import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AuthProvider from 'context/AuthProvider';
import AppProvider from 'context/AppProvider';
import ChatRoom from 'components/ChatRoom';
import Login from 'components/Login';
import AddRoomModal from 'components/Modal/AddRoomModal';
import InviteMemberModal from 'components/Modal/InviteMemberModal';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppProvider>
          <Switch>
            <Route component={Login} path="/login" />
            <Route component={ChatRoom} path="/" />
          </Switch>
          <AddRoomModal />
          <InviteMemberModal />
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
