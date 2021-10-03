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
import React from 'react';
import { render } from '@testing-library/react';
import { authenticationService } from './service/AuthenticationService';
import { PrivateRoute } from './component/PrivateRoute';


class App extends React.Component{

  constructor(props) {
    super(props);

    this.state = {
        currentUser: null
    };
  }

  componentDidMount() {
    authenticationService.currentUser.subscribe(x => this.setState({ currentUser: x }));
  }


  render() {

    const { currentUser } = this.state;

    return (<Router>
      <div className="app-container">
        <NavBar user={currentUser}></NavBar>
        <Switch>
        <Route path="/mood/:id" component={MusicListening}/>
        <Route path="/all-songs" component={AllSongs}/>
        <Route path="/login" component={LogIn}/>
        <PrivateRoute path="/add-song" component={AddSong}/>
        <Route path="/" component={Home}/>
        </Switch>
    </div>
    </Router>
  )
  }
}

export default App;
