import React from 'react';
import '../AddSong.css';
import { Alert } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { authenticationService } from '../../service/AuthenticationService';
import { Route, Redirect } from 'react-router-dom';
import './AdminRegister.css'

class AdminRegister extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            redirect: false,
            serverErrorMessage: null,
            validationErrorMessages: null,
            buttonDisabled: false,
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.checkForErrors = this.checkForErrors.bind(this);
        this.setValidationErrors = this.setValidationErrors.bind(this);
        this.setServerErrors = this.setServerErrors.bind(this);
        this.displayAlert = this.displayAlert.bind(this);
        this.currentUserIsLoggedInAndNotAnAdmin = this.currentUserIsLoggedInAndNotAnAdmin.bind(this);
    }

    componentDidMount() {
        //authenticationService.login("mavozd", "1234");
    }

    handleSubmit(event) {
        event.preventDefault();
        authenticationService.registerAdmin(this.state.username, this.state.password).then(message => {
            if (message.status == 200) {
                this.setState( {redirect : true });
            }
        })
        .catch((err) => {
            this.setState({ serverErrorMessage: "User with this username already exists!" });
            this.checkForErrors();
        });
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value,
            serverErrorMessage: name === 'username' ? null : this.state.serverErrorMessage,
        }, this.checkForErrors);

    }

    setValidationErrors() {
        let usernameError = "";
        let passwordError = "";
        if (!this.state.username.length > 0) {
            usernameError = "Username should be at least 1 character long."
        }
        if (this.state.password.length < 4) {
            passwordError = "Password should be at least 4 characters long."
        }
        if (usernameError !== "" || passwordError !== "") {
            this.setState({ buttonDisabled: true });
        }
        this.setState({
            validationErrorMessages: {
                username: usernameError,
                password: passwordError
            }
        });
    }

    displayAlert() {
        if (this.state.validationErrorMessages !== null) {
            if (this.state.validationErrorMessages.username !== '' || this.state.validationErrorMessages.password !== '') {
                return true;
            }
        }
        if (this.state.serverErrorMessage) {
            return true;
        }
        return false;
    }

    checkForErrors() {
        this.setServerErrors();
        this.setValidationErrors();
    }

    displayErrorMessage() {
        if (this.state.serverErrorMessage) {
            return <li>{this.state.serverErrorMessage}</li>;
        }
        if (this.state.validationErrorMessages !== null) {
            return (<span>
                {this.state.validationErrorMessages.username && <li>{this.state.validationErrorMessages.username}</li>}
                {this.state.validationErrorMessages.password && <li>{this.state.validationErrorMessages.password}</li>}
            </span>);
        }
    }

    setServerErrors() {
        if (this.state.serverErrorMessage) {
            this.setState({ buttonDisabled: true });
        } else {
            this.setState({ buttonDisabled: false });
        }
    }

    currentUserIsLoggedInAndNotAnAdmin() {
        return authenticationService.currentUserValue !== null && !authenticationService.currentUserValue.isAdmin;
    }

    render() {
        if (this.state.redirect == true || this.currentUserIsLoggedInAndNotAnAdmin()) {
            return <Redirect to="/"></Redirect>
        }
        return <div className="page-content">
            <div className="background-green">
                <h2>Register Admin</h2>
                {this.displayAlert() && <Alert variant="danger">{this.displayErrorMessage()}</Alert>}
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <Form.Control value={this.state.username} onChange={this.handleInputChange} name="username" type="text" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control value={this.state.password} onChange={this.handleInputChange} name="password" type="password" />
                    </Form.Group>
                    <Button variant="primary" type="submit" disabled={this.state.buttonDisabled}>
                        Sign Up
                    </Button>
                </Form>
            </div>
        </div>
    }
}

export default AdminRegister