import React from "react";
import { useState } from "react";
import { Redirect, useParams } from "react-router";
import MoodService from "../service/MoodService";
import SongService from "../service/SongService";
import { useEffect } from "react";
import SongForm from "./SongForm";
import { render } from "@testing-library/react";

function EditDeleteSong() {

    const [song, setSong] = useState({ title: '', artist: '', moodId: '' });
    const [moods, setMoods] = useState([]);
    const [validated, setValidated] = useState(false);
    const [redirect, setRedirect] = useState(false);

    let { id } = useParams();

    useEffect(() => {
        MoodService.getAllMoods().then((data) => {
            setMoods(data);
            console.log(moods);
        });
        SongService.getSong(id).then((data) => {
            setSong(data);
            console.log(song);
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
            console.log(song);
            SongService.updateSong(song).then(response => {
                console.log(response);
                setRedirect(true);
            });
        }
        setValidated(true);
    }

    const handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        console.log(song);
        song[name] = value;
        console.log(song);
        setSong(song);
    }

    const Redirect = () => {
        if (redirect) {
            return <Redirect to="all-songs"></Redirect>
        }
    }

    return <div className="page-content">
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
                editForm={true} />
        </div>
    </div>
}

export default EditDeleteSong;