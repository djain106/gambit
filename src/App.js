import './App.css';
import TopBar from './app_bar/TopBar';
import NavRouter from './pages/NavSwitch'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import dotenve from 'dotenv'
import axios from './services/axios'
import { UserContext } from './pages/contexts/user-context.js'
import { AuthContext } from './pages/contexts/auth-context'

function App() {
  dotenve.config();
  const [cookie, setCookie, removeCookie] = useCookies(['AUTH-TOKEN']);
  const [user, setUser] = useState({});
  const [authToken, setAuthToken] = useState()

  useEffect(() => {
    async function getUser() {
      const res = await axios.get('/auth/user');
      setUser({
        username: res.data.username,
        balance: res.data.balance,
      });
    }

    if (!(JSON.stringify(cookie) === '{}') && cookie["AUTH-TOKEN"] && cookie['AUTH-TOKEN'] !== "") {
      getUser();
    } else {
      setUser({});
    }
    return () => { }
  }, [cookie])

  function appLogin(username, password) {
    axios.post('/auth/login', {
      username: username,
      password: password,
    })
      .then(function (res) {
        const token = res.data.token;
        setUser({
          username: res.data.user.username,
          balance: res.data.user.balance,
        });
        setAuthCookie(token);
        return true
      })
      .catch(function (err) {
        console.log(err);
        return false
      });
  }

  function appLogout() {
    removeCookie("AUTH-TOKEN");
  }

  function setAuthCookie(token) {
    if (token.length > 0) {
      setCookie('AUTH-TOKEN'
        , token
        , { maxAge: 3600 });
      setAuthToken(token)
    } else {
      removeCookie("AUTH-TOKEN");
      setAuthToken("");
    }

  }

  return (
    <div className="app">
      <UserContext.Provider value={{ user, setUser }}>
        <AuthContext.Provider value={{ authToken, setAuthCookie }}>
          <div className="topBar">
            <TopBar onLogout={appLogout} />
          </div>
          <NavRouter className="navRouter" onLogin={appLogin} />
        </AuthContext.Provider>
      </UserContext.Provider>
    </div>
  );
}

export default App;
