import React from 'react';

class NavItem extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return <div className="nav-item"><a href='google.com'>{this.props.name}</a></div>
    }
}

export default NavItem