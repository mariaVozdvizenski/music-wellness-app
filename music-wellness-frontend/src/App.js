import logo from './logo.svg';
import './App.css';
import NavBar from './component/NavBar';
import AddSong from './component/AddSong';
import LogIn from './component/LogIn';
import Home from './component/Home';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
import AllSongs from './component/AllSongs';
import MusicListening from './component/MusicListening';

function App() {
  return (
    <Router>
      <div className="app-container">
        <NavBar></NavBar>
        <Switch>
        <Route path="/mood/:id">
          <MusicListening></MusicListening>
        </Route>
        <Route path="/all-songs">
          <AllSongs/>
        </Route>
        <Route path="/login">
          <LogIn/>
        </Route>
        <Route path="/add-song">
          <AddSong/>
        </Route>
        <Route path="/">
          <Home/>
        </Route>
        </Switch>
    </div>
    </Router>
  );
}

export default App;
