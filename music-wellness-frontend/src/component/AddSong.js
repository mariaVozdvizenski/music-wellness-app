import React from 'react';
import './AddSong.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { authenticationService } from '../service/AuthenticationService';
import { Redirect } from 'react-router-dom';
import MoodService from '../service/MoodService';
import SongService from '../service/SongService';

class AddSong extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            moods: [],
            title: '',
            artist: '',
            moodValue: '1',
            selectedFile: null,
            validated: false,
            redirect: false
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        MoodService.getAllMoods().then((data) => {
            this.setState({ moods: data });
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            let formData = new FormData();
            formData.append("file", this.state.selectedFile);

            let song = {title: this.state.title, moodId: this.state.moodValue, artist: this.state.artist, fileName: null};

            SongService.uploadAudio(formData).then((response) => {
                song.fileName = response.fileName;
                SongService.postSong(song).then((response) => {
                    this.setState({redirect : true})
                })
            });
        }
        this.setState({validated: true});
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSelectChange(event) {
        const target = event.target;
        this.setState({
            moodValue: target.value
        });
    }

    handleFileChange(event) {
        this.setState({
            selectedFile : event.target.files[0]
        });
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to="/all-songs"></Redirect>
        }
        if (!authenticationService.currentUser || !authenticationService.currentUserValue.isAdmin) {
            return <Redirect to="/login"></Redirect>
        }
        return <div className="page-content">
            <div className="background-green">
                <h2>Add a New Song</h2>
                <Form noValidate onSubmit={this.handleSubmit} validated={this.state.validated}>
                    <Form.Group>
                        <Form.Label>Title</Form.Label>
                        <Form.Control required onChange={this.handleInputChange} name="title" type="text" placeholder="Enter song title" />
                        <Form.Control.Feedback type="invalid">Song title is required.</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Artist</Form.Label>
                        <Form.Control onChange={this.handleInputChange} name="artist" type="text" placeholder="Enter song artist" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Mood</Form.Label>
                        <Form.Select required aria-label="Song moods" onChange={this.handleSelectChange} value={this.state.moodValue}>
                            { 
                                this.state.moods.map((mood) => <option key={mood.id} value={mood.id}>{mood.moodName}</option>)
                            }
                        </Form.Select>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Choose an audio file</Form.Label>
                        <Form.Control required accept=".mp3" onChange={this.handleFileChange} type="file"/>
                        <Form.Control.Feedback type="invalid">Please choose an audio file.</Form.Control.Feedback>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Create
                    </Button>
                </Form>
            </div>
        </div>
    }
}

export default AddSong