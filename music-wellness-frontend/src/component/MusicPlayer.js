import React from 'react';
import {Howl, Howler} from 'howler';
import ReactJkMusicPlayer from 'react-jinke-music-player'
import 'react-jinke-music-player/assets/index.css'

class MusicPlayer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            audioList : [{
                name: "Wee",
                musicSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
                cover: "https://filecnc.com/9718-large_default/Geometric-Pattern-Square-Vector-Free-Vector.jpg"
            }, {
                name: "Woah",
                musicSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
                cover: "https://filecnc.com/9718-large_default/Geometric-Pattern-Square-Vector-Free-Vector.jpg"
            }]
        }
    }


    render() {
        return <div>
            <ReactJkMusicPlayer theme="dark" mode="full" audioLists={this.state.audioList} remove={false}></ReactJkMusicPlayer>
        </div>
    }
}

export default MusicPlayer