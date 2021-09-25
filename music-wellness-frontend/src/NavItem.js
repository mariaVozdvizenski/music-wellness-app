import React from 'react';

class NavItem extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return <div className="nav-item">{this.props.name}</div>
    }
}

export default NavItem