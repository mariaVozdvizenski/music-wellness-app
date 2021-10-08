import React from 'react';
import './AddSong.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { authenticationService } from '../service/AuthenticationService';
import { Redirect } from 'react-router-dom';
import MoodService from '../service/MoodService';
import SongService from '../service/SongService';
import SongForm from './SongForm';

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
                    console.log(song);
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
            }, () => console.log(this.state.moodValue));
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
        if (!authenticationService.currentUserValue.isAdmin) {
            return <Redirect to="/login"></Redirect>
        }
        return <div className="page-content">
            <div className="background-green">
            <h2>Add a New Song</h2>
            <SongForm handleSubmit={this.handleSubmit} 
            validated={this.state.validated} 
            handleInputChange={this.handleInputChange} 
            handleSelectChange={this.handleSelectChange} 
            moodValue={this.state.moodValue}
            handleFileChange={this.handleFileChange}
            moods={this.state.moods}
            title={this.state.title}
            artist={this.state.artist}
            editForm={false}/>
            </div>
        </div>
    }
}

export default AddSong