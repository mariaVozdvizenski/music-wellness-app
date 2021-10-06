import React from 'react';
import './AddSong.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { authenticationService } from '../service/AuthenticationService';
import { Route, Redirect } from 'react-router-dom';

class LogIn extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            redirect: false,
            serverErrorMessage: null
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderAlert = this.renderAlert.bind(this);
    }

    componentDidMount() {
        //authenticationService.login("mavozd", "1234");
    }

    handleSubmit(event) {
        authenticationService.login(this.state.username, this.state.password).then(user => {
           this.setState({redirect: true});
        }).catch(error => {
            this.setState({serverErrorMessage: "Username or password is incorrect"})
        });
        event.preventDefault();
    }

    renderAlert() {
        if (this.state.serverErrorMessage != null) {
            return <Alert variant="danger"><li>{this.state.serverErrorMessage}</li></Alert>
        }
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    render() {
        if (this.state.redirect == true || authenticationService.currentUserValue) {
            return <Redirect to="/"></Redirect>
        }
        return <div className="page-content">
        <div className="background-green">
            <h2>Log In</h2>
            {this.renderAlert()}
            <Form onSubmit={this.handleSubmit}>
                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control value={this.state.username} onChange={this.handleInputChange} name="username" type="text"/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control value={this.state.password} onChange={this.handleInputChange} name="password" type="password"/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Login
                </Button>
            </Form>
        </div>
    </div>
    }
}

export default LogIn