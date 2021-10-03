import NavItem from './NavItem';
import React from 'react';
import NavPicture from './NavPicture';
import { authenticationService } from './../service/AuthenticationService';

class NavBar extends React.Component {

    constructor(props) {
        super(props);
        this.renderUserLogIn = this.renderUserLogIn.bind(this);
    }

    logOut() {
        authenticationService.logout();
    }

    renderUserLogIn() {
        console.log(this.props.user)
        if (this.props.user) {
            return (
                <React.Fragment>
                    <div className="nav-item">
                        <p>{"Hello, " + this.props.user.userName + "!"}</p>
                    </div>
                    <div className="nav-item">
                        <a onClick={this.logOut}>Logout</a>
                    </div>
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
            {
             this.renderUserLogIn()
            } 
            <NavItem url="/all-songs" name="All Songs"></NavItem>
        </div>
    }
}

export default NavBar