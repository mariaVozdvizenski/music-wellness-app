import React from "react";
import { useState } from "react";
import { Redirect, useParams } from "react-router";
import MoodService from "../service/MoodService";
import SongService from "../service/SongService";
import { useEffect } from "react";
import SongForm from "./SongForm";
import { render } from "@testing-library/react";
import Button from 'react-bootstrap/Button';

function EditDeleteSong(props) {

    const [song, setSong] = useState({ title: '', artist: '', moodId: '', fileName: '' });
    const [moods, setMoods] = useState([]);
    const [validated, setValidated] = useState(false);
    const [redirect, setRedirect] = useState(false);

    let { id } = useParams();

    useEffect(() => {
        MoodService.getAllMoods().then((data) => {
            setMoods(data);
        });
        SongService.getSong(id).then((data) => {
            setSong(data);
        });
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            //let formData = new FormData();
            //formData.append("file", this.state.selectedFile);
            SongService.updateSong(song).then(response => {
                props.history.push('/all-songs');
            });
        }
        setValidated(true);
    }

    const handleDelete = (event) => {
        SongService.deleteAudio(song.fileName).then(response => {
            SongService.deleteSong(id).then(response => {
                props.history.push('/all-songs');
            });
        });
    }

    const handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        song[name] = value;
        setSong(song);
    }


    return (<div className="page-content">
        <div className="background-green">
            <h2>Edit</h2>
            <SongForm
                handleSubmit={handleSubmit}
                validated={validated}
                handleInputChange={handleInputChange}
                handleSelectChange={handleInputChange}
                moodValue={song.moodId}
                moods={moods}
                title={song.title}
                artist={song.artist}
                editForm={true}
                handleDelete={handleDelete} />
        </div>
    </div>)
}

export default EditDeleteSong;