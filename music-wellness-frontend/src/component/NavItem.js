import React from 'react';
import {
    Link,
    useParams
} from "react-router-dom";

class NavItem extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return <div className="nav-item">
            <Link to={this.props.url}>{this.props.name}</Link>
        </div>
    }
}

export default NavItem