import './App.css';
import TopBar from './app_bar/TopBar';
import NavSwitch from './pages/NavSwitch'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import jwt from 'jsonwebtoken';
import dotenve from 'dotenv'

function App() {
  dotenve.config();
  const [username, setUsername] = useState('');
  const [balance, setBalance] = useState(0);
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const privateKey = process.env.REACT_APP_JWT_PRIVATE_KEY;

  function appLogin(username, balance) {
    setUsername(username);
    setBalance(balance);
    const token = jwt.sign({ exp: Math.floor(Date.now() / 1000) + (60 * 60), username: username, balance: balance }, privateKey);
    setCookie("token", token, { maxAge: 3600 });
  }

  function appLogout() {
    removeCookie("token");
    setUsername("");
    setBalance(0);
    console.log(cookies);
  }

  return (
    <div className="app">
      <div className="topBar">
        <TopBar onLogout={appLogout} privateKey={privateKey} />
      </div>
      <NavSwitch onLogin={appLogin} username={username} balance={balance} />
    </div>
  );
}

export default App;
