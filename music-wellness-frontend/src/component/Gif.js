import React from 'react';
import './Gif.css';

class Gif extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return <div className={"gif " + this.props.name}>
            <span>Gif by {this.props.source}</span>
            <div className="gif-bg">
            </div>
        </div>
    }
}

export default Gif