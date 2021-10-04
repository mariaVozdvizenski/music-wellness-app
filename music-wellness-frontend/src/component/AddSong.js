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
            selectedFile: null
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
        let formData = new FormData();
        formData.append("file", this.state.selectedFile);

        SongService.uploadAudio(formData).then((response) => {
        
        });

        event.preventDefault();
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
        console.log(this.state.selectedFile);
        if (!authenticationService.currentUser || !authenticationService.currentUserValue.isAdmin) {
            return <Redirect to="/login"></Redirect>
        }
        return <div className="page-content">
            <div className="background-green">
                <h2>Add a New Song</h2>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group>
                        <Form.Label>Title</Form.Label>
                        <Form.Control onChange={this.handleInputChange} name="title" type="text" placeholder="Enter song title" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Artist</Form.Label>
                        <Form.Control onChange={this.handleInputChange} name="artist" type="text" placeholder="Enter song artist" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Mood</Form.Label>
                        <Form.Select aria-label="Song moods" onChange={this.handleSelectChange} value={this.state.moodValue}>
                            <option>Please select a song mood</option>
                            { 
                                this.state.moods.map((mood) => <option key={mood.id} value={mood.id}>{mood.moodName}</option>)
                            }
                        </Form.Select>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Choose an audio file</Form.Label>
                        <Form.Control accept=".mp3" onChange={this.handleFileChange} type="file"/>
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