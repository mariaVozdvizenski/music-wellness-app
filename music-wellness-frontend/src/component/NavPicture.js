import React from 'react';
import Link from 'react-router-dom/Link';

class NavPicture extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return <div className="nav-wrapper">
            <Link to="/">
            <div className="nav-item nav-pic"></div>
            </Link> 
        </div>
    }
}

export default NavPicture