import React from 'react';
import './AllSongs.css';
import Song from './Song';
import { Link } from 'react-router-dom';
import { authenticationService } from '../service/AuthenticationService';
import SongService from '../service/SongService';

class AllSongs extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            songs: []
        }
        this.getSong = this.getSong.bind(this);
    }

    componentDidMount() {
        SongService.getAllSongs().then((data) => {
            this.setState({songs : data});
        });
    }

    getSong() {
        return {
            title: "Waves",
            artist: "Lola",
            mood: "Happy"
        };
    }

    renderAddSongLink() {
        if (authenticationService.currentUserValue && authenticationService.currentUserValue.isAdmin) {
            return <Link to="/add-song"><a>Add a new song</a></Link>
        }
    }

    render() {
        return <div className="page-content">
            <div className="all-songs">
                { this.renderAddSongLink() }
                <div className="list-of-songs">
                    { this.state.songs.map((s) => <Song song={s}></Song>) }
                </div>
            </div>
        </div>
    }
}

export default AllSongs