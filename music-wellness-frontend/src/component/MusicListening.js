import React from 'react';
import './MusicListening.css';
import MusicPlayer from './MusicPlayer';
import Emoji from './Emoji';
import {
    useParams
} from "react-router-dom";

function MusicListening() {
        let { id } = useParams();
        console.log(id);
        return (<div className="music-listening">
            <h1>Creating a happy mood...</h1>
            <p className="description">
                <Emoji symbol="✨🎵🎵🎵✨" label="note"></Emoji>
            </p>
            <MusicPlayer></MusicPlayer>
        </div>
        );
}

export default MusicListening