import NavItem from './NavItem';
import React from 'react';
import NavPicture from './NavPicture';
import { authenticationService } from './../service/AuthenticationService';
import { Route, Redirect } from 'react-router-dom';


class NavBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            redirect: false
        };
        this.renderUserLogIn = this.renderUserLogIn.bind(this);
        this.logOut = this.logOut.bind(this);
    }

    logOut() {
        authenticationService.logout();
        this.setState({redirect: true});
    }

    renderUserLogIn() {
        if (this.props.user) {
            let register;
            if (this.props.user.isAdmin) {
                register = <NavItem url="/register-admin" name="Register admin"></NavItem>
            }
            return (
                <React.Fragment>
                    <div className="nav-item">
                        <p>{"Hello, " + this.props.user.userName + "!"}</p>
                    </div>
                    <div className="nav-item">
                        <a onClick={this.logOut}>Logout</a>
                    </div>
                    {
                        register
                    }
                </React.Fragment>
            )
        } else if (!this.props.user) {
            return (
                <React.Fragment>
                <NavItem url="/login" name="Log In"></NavItem>
                <NavItem url="/register" name="Register"></NavItem>
                </React.Fragment>
            )
        }
    }

    render() {
        return <div className="nav">
            <NavPicture></NavPicture>
            <NavItem url="/" name="Home"></NavItem>
            <NavItem url="/all-songs" name="All Songs"></NavItem>
            {
             this.renderUserLogIn()
            } 
            <NavItem url="/credits" name="Credits"></NavItem>
        </div>
    }
}

export default NavBar