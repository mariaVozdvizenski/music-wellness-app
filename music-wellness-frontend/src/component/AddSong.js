import React from 'react';
import './AddSong.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { authenticationService } from '../service/AuthenticationService';
import { Redirect } from 'react-router-dom';


class AddSong extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        if (!authenticationService.currentUser || !authenticationService.currentUserValue.isAdmin) {
            return <Redirect to="/login"></Redirect>
        }
        return <div className="page-content">
            <div className="background-green">
                <h2>Add a New Song</h2>
                <Form>
                    <Form.Group>
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" placeholder="Enter song title" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Artist</Form.Label>
                        <Form.Control type="text" placeholder="Enter song artist" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Choose an audio file</Form.Label>
                        <Form.Control type="file"/>
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