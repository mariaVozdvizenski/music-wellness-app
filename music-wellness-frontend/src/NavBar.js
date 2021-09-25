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
            <NavItem name="Log In"></NavItem>
            <NavItem name="Register"></NavItem>
            <NavItem name="All Songs"></NavItem>
        </div>
    }
}

export default NavBar