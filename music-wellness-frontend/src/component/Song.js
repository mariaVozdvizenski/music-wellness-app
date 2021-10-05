import React from 'react';
import './Song.css';
import {
    Link,
    useParams
} from "react-router-dom";


class Song extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return <Link className="song-link" to={"/mood/" + this.props.song.moodId + "/" + this.props.song.id}><div className="song">
            <div className="song-info">
            <h2>{this.props.song.title}</h2>
            <p>{this.props.song.artist}</p>
            <p className="song-mood">{this.props.song.moodName.toUpperCase()}</p>
            </div>
        </div></Link>
    }
}

export default Song