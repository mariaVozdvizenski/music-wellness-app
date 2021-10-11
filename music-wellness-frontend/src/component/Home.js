import React from 'react';
import MoodList from './MoodList';

class Home extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return <div className="page-content-home">
            <div className="home-background"></div>
            <h1 className="welcome">Welcome</h1>
            <p>How would you like to feel right now?</p>
            <MoodList></MoodList>
        </div>
    }
}

export default Home