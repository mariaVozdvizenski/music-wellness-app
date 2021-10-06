import React from 'react';
import ReactJkMusicPlayer from 'react-jinke-music-player';
import 'react-jinke-music-player/assets/index.css';
import GlobalVariables from '../service/GlobalVariables';

class MusicPlayer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            audioList: []
        }
        this.getSongUrls = this.getSongUrls.bind(this);
        this.audioURL = "/songs/download?fileName=";
    }

    componentDidMount() {
        this.setState( {audioList : this.getSongUrls()} )
    }

    getSongUrls() {
        let filenames = this.props.songs.map(s => s.fileName); 
        let fullURLS = filenames.map(f => GlobalVariables.baseURL + this.audioURL + f)
        return fullURLS;
    }

    onDestroyed = (currentPlayId, audioLists, audioInfo) => {
        console.log('onDestroyed:', currentPlayId, audioLists, audioInfo)
    }

    render() {
        return <div>
            <ReactJkMusicPlayer 
            loadAudioErrorPlayNext={true} 
            onDestroyed={this.onDestroyed} 
            autoHiddenCover={true} 
            defaultVolume={0.8}
            theme="dark" 
            mode="full" 
            audioLists={this.props.songs} 
            remove={false} 
            showDownload={false}>
            </ReactJkMusicPlayer>
        </div>
    }
}

export default MusicPlayer