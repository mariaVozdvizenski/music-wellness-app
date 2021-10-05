import React from 'react';
import './Song.css';


class Song extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props.song);
        return <div className="song">
            <div className="song-info">
            <h2>{this.props.song.title}</h2>
            <p>{this.props.song.artist}</p>
            <p className="song-mood">{this.props.song.moodName.toUpperCase()}</p>
            </div>
        </div>
    }
}

export default Song