import React from 'react';
import { Link } from 'react-router-dom';

class MoodButton extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return <li>
            <Link to={"/mood/" + this.props.id}><button className="mood-button">{this.props.name}</button></Link>
            </li>
    }

}

export default MoodButton