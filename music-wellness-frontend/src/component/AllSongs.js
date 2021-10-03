import React from 'react';
import './AllSongs.css';
import Song from './Song';
import { Link } from 'react-router-dom';
import { authenticationService } from '../service/AuthenticationService';


class AllSongs extends React.Component {

    constructor(props) {
        super(props);
        this.getSong = this.getSong.bind(this);
    }

    getSong() {
        return {
            title: "Waves",
            artist: "Lola",
            mood: "Happy"
        };
    }

    renderAddSongLink() {
        console.log(authenticationService.currentUserValue);
        if (authenticationService.currentUserValue && authenticationService.currentUserValue.isAdmin) {
            return <Link to="/add-song"><a>Add a new song</a></Link>
        }
    }

    render() {
        return <div className="page-content">
            <div className="all-songs">
                { this.renderAddSongLink() }
                <div className="list-of-songs">
                    <Song song={this.getSong()}></Song>
                    <Song song={this.getSong()}></Song>
                    <Song song={this.getSong()}></Song>
                    <Song song={this.getSong()}></Song>
                    <Song song={this.getSong()}></Song>
                    <Song song={this.getSong()}></Song>
                    <Song song={this.getSong()}></Song>
                    <Song song={this.getSong()}></Song>
                    <Song song={this.getSong()}></Song>
                    <Song song={this.getSong()}></Song>
                    <Song song={this.getSong()}></Song>
                    <Song song={this.getSong()}></Song>
                    <Song song={this.getSong()}></Song>
                    <Song song={this.getSong()}></Song>
                    <Song song={this.getSong()}></Song>
                </div>
            </div>
        </div>
    }
}

export default AllSongs