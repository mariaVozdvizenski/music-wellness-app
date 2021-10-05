import React from 'react';
import './Song.css';
import { authenticationService } from '../service/AuthenticationService';

import {
    Link,
    useParams
} from "react-router-dom";


class Song extends React.Component {

    constructor(props) {
        super(props);
    }

    renderEditButton() {
        if (authenticationService.currentUserValue != null && authenticationService.currentUserValue.isAdmin) {
            return <Link className="edit-button" to={"/edit-delete/" + this.props.song.id}>Edit / Delete</Link>;
        }  
    }

    render() {
        return <Link className="song-link" to={"/mood/" + this.props.song.moodId + "/" + this.props.song.id}><div className="song">
            <div className="song-info">
            <h2>{this.props.song.title}</h2>
            <p className="song-mood">{this.props.song.moodName.toUpperCase()}</p>
            </div>
            <div>
            {
                this.renderEditButton()
            }
            </div>
        </div>
    </Link>
    }
}

export default Song