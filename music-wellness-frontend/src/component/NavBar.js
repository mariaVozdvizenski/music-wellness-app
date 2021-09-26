import NavItem from './NavItem';
import React from 'react';
import NavPicture from './NavPicture';

class NavBar extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return <div className="nav">
            <NavPicture></NavPicture>
            <NavItem url="/login" name="Log In"></NavItem>
            <NavItem url="/register" name="Register"></NavItem>
            <NavItem url="/all-songs" name="All Songs"></NavItem>
        </div>
    }
}

export default NavBar